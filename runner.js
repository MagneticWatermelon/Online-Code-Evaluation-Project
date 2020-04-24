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
    executeCode(options).then((message)=>{
      console.log(message)
      testCode(options,inputs).then(resultset=>{
        console.log(resultset.toString())
      })
    })
  })
}

function initUser(userid,lang,code){
  return new Promise((resolve,reject)=>{

    let userFolder = `temp/${userid}`

    if(!fs.existsSync(path.resolve(userFolder))){fs.mkdirSync(userFolder)}

    let tempFile = `${userFolder}/src${extensions[lang]}`
    fs.openSync(tempFile,'w')
    fs.writeFileSync(tempFile,code)

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

  return new Promise((resolve,reject)=>{
    createContainer(false,options).then(container=>{
        container.start().then(data=>{
          container.stop().then(data=>{
            container.remove().then(data=>{resolve('container removed')})
          })
        })
    })
  })
}

function testCode(options,inputs){
  return new Promise((resolve,reject)=>{
    createContainer(true,options).then(async (container)=>{
      container.start()
      var result;
      for(args of inputs){
        result = await singleTest(container,args)
      }
      container.stop().then(info=>{
        container.remove().then(info=>{
          resolve(result)
        })
      })
    })
  })
}

function singleTest(container, inputs){

  let attach_opts = {stream: true, stdin: true, stdout: true, stderr: true};

  return new Promise((resolve,reject)=>{
    container.attach(attach_opts).then(stream=>{
      streamify(mapInputs(inputs)).pipe(stream)
      container.restart().then(info=>{
        container.logs({stdout:true,stderr:true}).then(data=>{
          resolve(data)
        })
      })
    })
  })
}

function mapInputs(inputs){
  inputs.push(os.EOL)
  return inputs.map(item=>`${item}\n`)
}


function test(){

  let code = `import java.util.Scanner;

  public class src {
  
      public static void main(String[] args) {
  
        Scanner sc = new Scanner(System.in);

        int a = sc.nextInt();
        int b = sc.nextInt();

        System.out.println(a/b);
    }
    }
  
  `
  let inputs =[['1','9'],['2','4'],['9','7']]

  let outputs = [
    ['3'],
    ['7'],
    ['99']
  ]
  evaluateAttempt('nyilmaz','java',code,inputs,outputs)

}

test()




