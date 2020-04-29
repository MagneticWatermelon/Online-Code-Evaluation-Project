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
    
    let success = await new Promise((resolve,reject)=>{
        docker.modem.followProgress(stream, 
            (err, res) => err ? reject(false) : resolve(true));
    })

    return success;
}

/*function for running a single test case
*/
async function run(imagename, testcase){

    let container = await createContainer(imagename,null);

    await attachInputsToContainer(container,testcase)

    container.start();

    let output = []

    let logStream = new require('stream').PassThrough();

    logStream.on('data', function(chunk){
        output.push(chunk.toString('utf8').replace('\n',''))
    })
    
    await container.wait();

    await new Promise((resolve,reject)=>{
        
        container.logs({follow:true,stdout:true,stderr:true},(err,stream)=>{
            if(err){reject('cannot get logs from container')}
            
            container.modem.demuxStream(stream, logStream, logStream);
            
            stream.on('end', function(){
                
                resolve('log is ended')
                logStream.end();
                
                container.remove(()=>{})
                
            });
        })
    })

    return output;
}

/*function for getting all results from all test cases
*/
async function getResults(imagename, inputs){
    let resultset = []

    for(input of inputs){
        try{
            let output = await run(imagename,input)
            resultset.push(output)
        }
        catch(e){
            resultset.push([])
        }
    }

    return output;
}

/*function for attaching inputs to the container
*/
async function attachInputsToContainer(container, inputs){
    
    let inputs_fixed    = [].concat(...inputs.map(e => [e, '\n']))
    let inputstream     = readable.from(inputs_fixed)
    
    await new Promise((resolve,reject)=>{
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

/*function for creating a container for a test case
*/
async function createContainer(imagename, hostConfig){
    let container = await docker.createContainer(
        {
          Image         : imagename,
          AttachStdin   : true,
          AttachStdout  : true,
          AttachStderr  : true,
          OpenStdin     : true,
          StdinOnce     : false,
          Tty           : false,
          Cmd           : [],
          HostConfig    : hostConfig
        })

    return container
}
  

