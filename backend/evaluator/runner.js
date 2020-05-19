/* This class runs the user-submitted code on a conainer and then
   returns back the result
*/
module.exports.buildImage   = buildImage;
module.exports.getOutputs   = getOutputs;
module.exports.runCode      = runCode;
module.exports.removeImage  = removeImage;

const Docker        = require('dockerode')
const Readable      = require('stream').Readable;

const targenerator  = require('./tar-generator')

const attachOptions =   {logs:true,stream: true, stdin: true, stdout: true, stderr: true};

const hostConfigs   =   {
    AutoRemove:false
}

docker = new Docker()

/*function for building the image
*/
async function buildImage(bundle, options){
    try{

        await removeImage(options.t)

        let tar     = targenerator.fromBundle(bundle)
        
        let stream  = await docker.buildImage(tar,options)
        
        await new Promise((resolve,reject)=>{
            docker.modem.followProgress(stream,(err,res)=>{err ? reject() : resolve()})
        })
        
        let success = await checkImage(options.t)
        return success;
    }
    catch(e){
        return false;
    }
}

async function runCode(bundle, imagename){
    let tag = `${imagename}test`;
    let buildsucess = await buildImage(bundle,{t:tag})
    if(!buildsucess){throw 'Compilation Error'}

    let output = await testInput(tag,null)

    return output;
}

/*function for running a single test case
*/
async function testInput(imagename, testcase){

    let container = await createContainer(imagename,hostConfigs);

    await attachToContainer(container,testcase)

    await container.start();

    let output = []

    let logStream = new require('stream').PassThrough();

    logStream.on('data', function(chunk){
        output.push(chunk.toString('utf8').replace('\n',''))
    })
    
    await container.wait();

    await new Promise((resolve,reject)=>{
        
        container.logs({follow:true,stdout:true,stderr:true},(err,stream)=>{
            if(err){return reject('cannot get logs from container')}
            
            container.modem.demuxStream(stream, logStream, logStream);
            
            stream.on('end', function(){
                logStream.end();
                resolve('log is ended')
                container.remove(()=>{})
            });
        })
    })

    return output;
}

/*function for getting all outputs from all test cases
*/
async function getOutputs(imagename, inputs){
    let outputs = []

    for(input of inputs){
        try{
            let output = await testInput(imagename,input)
            outputs.push(output)
        }
        catch(e){
            outputs.push(['Error ocurred'])
        }
    }

    return outputs;
}

function checkImage(imagename){
    return new Promise((resolve,reject)=>{
        docker.getImage(imagename).inspect()
        .then(image=>{resolve(true)})
        .catch(err=>{resolve(false)})
    })
}

function removeImage(imagename){
    return new Promise((resolve,reject)=>{
        docker.getImage(imagename).remove({force:true})
        .then(success=>{
            resolve()
        })
        .catch(err=>{
            resolve()
        })
    })
}

/*function for attaching inputs to the container
*/
async function attachToContainer(container, inputs){
    if(inputs==null || container == null){return}

    let inputs_fixed    = [].concat(...inputs.map(e => [e, '\n']))
    let inputstream     = Readable.from(inputs_fixed)
    
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

    return container;
}
  

