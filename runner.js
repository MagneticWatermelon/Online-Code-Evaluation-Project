module.exports.run = run;

const Docker = require('dockerode')
const fs = require('fs')

const hostIP = '192.168.99.100'
const hostPort = 2376

docker = new Docker({host:hostIP, port:hostPort});

const directories = 
{
  'java':'/languages/java-8',
  'c'     :'/languages/c',
  'c++'   :'/languages/c++',
}

const extensions =
{
  'java':'.java',
  'c'   :'.c',
  'c++' :'.cpp'
}

const commands =
{
  'java':['java','src.java']
}


function run(lang, code, callback){

fs.writeFile(__dirname.concat('/java/test.java'),code, ()=>{

  build('java-test',(stream)=>{
    new Promise((resolve, reject) => {
        docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
    }).then(image=>{

        var writeOutput = fs.createWriteStream('./java/output')

        docker.run('java-test', ['java','test'], writeOutput).then(function(data) {
            var container = data[1]
            container.remove()
            const output = fs.readFileSync('./java/output')
            callback(output.toString())
          }).catch(function(err) {
            console.log(err);
          });
    })
  })

}) 
}

function buildImage(userid, lang, code){
  let imageTag = `${userid}${lang}`;
  let localDir =  directories[lang];
  let srcFile  = `src${extensions[lang]}`

  console.log(imageTag)
  console.log(localDir)
  console.log(srcFile)

  fs.writeFileSync(`.${localDir}/${srcFile}`,code)

  let build = async(callback)=>{
    await docker.buildImage(
      {context: __dirname.concat(localDir),src: ['Dockerfile', srcFile]},
      {t: imageTag, rm:true, forcerm:true},
      (err,stream)=>{if(err){console.log(err)} return callback(stream)})
  }

  build((stream)=>{
    new Promise((resolve, reject) => {
      docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
    })
    .then(image=>{console.log(image)})
    })

    return imageTag;
}

async function executeCode(userid, lang, src, input, callback){
    image  = buildImage(userid, lang, src)

    docker.run(image,commands[lang])
    .then()
}


let code = `public class src {

  public static void main(String[] args) {
  System.out.println("Another text");
}
}

`
buildImage('nyilmaz','java',code)





