module.exports.evaluateAttempt = evaluateAttempt;

const Docker    = require('dockerode')
const fs        = require('fs')
const streamify = require('stream-array')
const os        = require('os')
const path      = require('path')

const hostIP = '192.168.99.100'
const hostPort = 2376

docker = new Docker({host:hostIP, port:hostPort});

// This is the unix path for conversion problems
const unixpathToApp = '//c/Users/10bag/Workspaces/ASSIGNMENTS/Comp202Project'

const baseImages =
{
  'java'  :'openjdk:8'
}

const extensions =
{
  'java':'.java',
  'c'   :'.c',
  'c++' :'.cpp'
}

const runCommands =
{
  'java':['java','src']
}

const compileCommands =
{
  'java':['javac','src.java']
}

function evaluateAttempt(userid, lang, code, inputs, outputs, callback){
  initUser(userid,lang,code).then(options=>{
    console.log('initiated user')
    executeCode(options).then((message)=>{
      console.log(message)
      testCode(options,inputs).then(resultset=>{
        console.log('resultset is returned')
        callback(resultset)
      })
    })
  })
}

function initUser(userid,lang,code){
  console.log('initiating user...')
  return new Promise((resolve,reject)=>{

    console.log('creating user files...')

    let userFolder = `temp/${userid}`

    if(!fs.existsSync(path.resolve(userFolder))){fs.mkdirSync(userFolder)}

    let tempFile = `${userFolder}/src${extensions[lang]}`
    fs.openSync(tempFile,'w')
    fs.writeFileSync(tempFile,code)

    console.log('user files are created...')

    mountOptions = {
      Source   :`${unixpathToApp}/${userFolder}`,
      Target   :'/var/src', Type     :'bind',
    }

    let options = {
      'userfolder'    :userFolder,
      'src'           :tempFile,
      'containername' :`${userid}${lang}`,
      'baseimage'     :baseImages[lang],
      'compilecmd'    :compileCommands[lang],
      'runcmd'        :runCommands[lang],
      'workingdir'    :'/var/src',
      'hostconfig'    : {Mounts: [mountOptions]}
    }
    resolve(options)
  })
}

/*
*   isCompiled : determines action of the container  
*/
function createContainer(isCompiled, options){
  console.log('creating container...')
  return docker.createContainer(
    {
      name          : options.containername,
      Image         : options.baseimage,
      AttachStdin   : true,
      AttachStdout  : true,
      AttachStderr  : true,
      OpenStdin     : true,
      StdinOnce     : false,
      Tty           : false,
      Cmd           : isCompiled ? options.runcmd : options.compilecmd,
      HostConfig    : options.hostconfig,
      WorkingDir    : options.workingdir
    })
}

function executeCode(options){
  console.log('starting compilation....')
  return new Promise((resolve,reject)=>{
    createContainer(false,options).then(container=>{
        console.log('container is created')
        container.start().then(data=>{
          console.log('container is started')
          container.stop().then(data=>{
            console.log('container is stopped')
            container.remove().then(data=>{
              console.log('container is removed');
              resolve('code compiled')
            })
          })
        })
    })
  })
}

function testCode(options,inputs){
  console.log('starting execution...')
  return new Promise((resolve,reject)=>{
    createContainer(true,options).then((container)=>{
      console.log('container is created')
      container.start().then(async info=>{
        console.log('container is started')
        var result;
        for(args of inputs){
          console.log('test case starting...')
          result = await singleTest(container,args)
          console.log('test case ended')
        }
          console.log('all test cases are done')
          console.log('stopping container...')
          container.stop().then(info=>{
            console.log('container is stopped')
            console.log('removing container...')
            container.remove().then(info=>{
              console.log('container removed')
              resolve(result)
            })
          })
      })
    })
  })
}

function singleTest(container, inputs){

  let attach_opts = {stream: true, stdin: true, stdout: true, stderr: true};

  return new Promise((resolve,reject)=>{
    console.log('attaching inputs...')
    container.attach(attach_opts).then(stream=>{
      streamify(mapInputs(inputs)).pipe(stream)
      console.log('inputs are attached')

      console.log('restarting container...')
      container.restart().then(info=>{
        console.log('restarted container')
        console.log('getting log of event...')
        container.logs({stdout:true,stderr:true}).then(data=>{
          console.log('log is returned')
          resolve(data)
        })
      })
    })
  })
}

