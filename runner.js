module.exports.build        = build;
module.exports.getResults   = getResults;

const Docker        = require('dockerode')
const targenerator  = require('./tar-generator')
const dotenv        = require('dotenv')
const readable      = require('stream').Readable;

dotenv.config('./env')

const hostIP        =   process.env.DOCKER_IP
const hostPort      =   process.env.DOCKER_PORT
const attachOptions =   {logs:true,stream: true, stdin: true, stdout: true, stderr: true};

docker = new Docker({host:hostIP, port:hostPort});


function build(bundle, options, callback){

    let tar = targenerator.generateFromBundle(bundle)

    docker.buildImage(tar,options)
    .then((logs)=>{
        callback(null, options.t)
    })
    .catch((err)=>{
        console.log(err)
        callback(err,null)
    })
}

function run(imagename, testcase){
    return new Promise((resolve,reject)=>{
        createContainer(imagename,null)

        .then(container=>{
            attachInputs(container,testcase)
            .then(message=>{
                console.log(message)
                container.start()
                .then(info=>{
                    
                    output = []

                    var logStream = new require('stream').PassThrough();
                    logStream.on('data', function(chunk){
                        output.push(chunk)
                    });

                    container.logs({follow:true,stdout:true,stderr:true},(err,stream)=>{
                        
                        container.modem.demuxStream(stream, logStream, logStream);

                        stream.on('end', function(){
                            logStream.end();
                            resolve(output)
                        });
                    })

                })
            })
        })
        
        .catch(err=>{
            reject(err)
        })
    })
}

function getResults(imagename, inputs){
    return new Promise(async (resolve,reject)=>{

        let results = []
        
        for(testcase of inputs){
            await run(imagename, testcase)
            .then(output=>{results.push(output)})
            .catch(err=>{reject(err)})
        }
        resolve(results)
    })
}

function attachInputs(container, inputs){
    let inputstream     = readable.from(mapInputs(inputs))
    return new Promise((resolve,reject)=>{
        container.attach(attachOptions)
        .then(stream=>{
            inputstream.pipe(stream)
            resolve('input is attached')
        })
    })
}

function mapInputs(inputs){
    return [].concat(...inputs.map(e => [e, '\n']))
}


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
  

