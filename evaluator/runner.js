/* This class runs the user-submitted code on a conainer and then
   returns back the result
*/

module.exports.build        = build;
module.exports.getResults   = getResults;

const Docker        = require('dockerode')
const readable      = require('stream').Readable;
const dotenv        = require('dotenv')


const targenerator  = require('./tar-generator')

dotenv.config('./env')

const hostIP        =   process.env.DOCKER_IP
const hostPort      =   process.env.DOCKER_PORT
const attachOptions =   {logs:true,stream: true, stdin: true, stdout: true, stderr: true};

docker = new Docker({host:hostIP, port:hostPort});

/*function for building the image
*/
async function build(bundle, options){

    let tar = targenerator.generateFromBundle(bundle)

    let stream = await docker.buildImage(tar,options)
    
    await new Promise((resolve,reject)=>{
        docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
    })
}

/*function for running a single test case
*/
function run(imagename, testcase){
    return new Promise((resolve,reject)=>{
        createContainer(imagename,null)

        .then(container=>{
            attachInputs(container,testcase)
            .then(message=>{
                container.start()
                .then(info=>{
                    
                    output = []

                    var logStream = new require('stream').PassThrough();
                    logStream.on('data', function(chunk){
                        output.push(chunk.toString('utf8').replace('\n',''))
                    })

                    container.logs({follow:true,stdout:true,stderr:true},(err,stream)=>{
                        if(err){reject('cannot get logs from container')}

                        container.modem.demuxStream(stream, logStream, logStream);

                        stream.on('end', function(){
                            container.stop(()=>{
                                container.remove(()=>{
                                    
                                })
                            })
                            
                            logStream.end();
                            resolve(output)
                        });
                    })

                })

                .catch(err=>{
                    reject('cannot start container')
                })
            })

            .catch(err=>{
                reject(err)
            })
        })
        
        .catch(err=>{
            reject('cannot create container')
        })
    })
}

/*function for getting all results from all test cases
*/
function getResults(imagename, inputs){
    return new Promise(async (resolve,reject)=>{

        let results = []
        
        for(testcase of inputs){
            await run(imagename, testcase)
            .then(output=>{results.push(output)})
            .catch(err=>{reject(err)})
        }
        docker.getImage(imagename).remove((info)=>{
            resolve(results)
        })
    })
}

/*function for attaching inputs to the container
*/
function attachInputs(container, inputs){
    let inputstream     = readable.from(mapInputs(inputs))
    return new Promise((resolve,reject)=>{
        container.attach(attachOptions)
        .then(stream=>{
            inputstream.pipe(stream)
            resolve('input is attached')
        })

        .catch(err=>{
            reject('cannot atach inputs')
        })
    })
}

/*function for adding '\n' to the end of each input
  they need to be entered that's the point of this function
*/
function mapInputs(inputs){
    return [].concat(...inputs.map(e => [e, '\n']))
}

/*function for creating a container for a test case
*/
function createContainer(imagename, hostConfig){
    return new Promise((resolve,reject)=>{
        
        docker.createContainer(
        {
          Image         : imagename,
          AttachStdin   : true,
          AttachStdout  : true,
          AttachStderr  : true,
          OpenStdin     : true,
          StdinOnce     : false,
          Tty           : false,
          Cmd           : []
        })
        .then(container=>{
            resolve(container)
        })
        .catch(err=>{
            reject(err)
        })
    })
}
  

