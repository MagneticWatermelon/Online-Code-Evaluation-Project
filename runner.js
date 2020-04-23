module.exports.run = run;

const Docker = require('dockerode')
const fs = require('fs')

const hostIP = '192.168.99.100'
const hostPort = 2376

docker = new Docker({host:hostIP, port:hostPort});

const directories = 
{
  'java':'./languages/java-8',
  'c'     :'./languages/c',
  'c++'   :'./languages/c++',
}

const extensions =
{
  'java':'.java',
  'c'   :'.c',
  'c++' :'.cpp'
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

function resolveImage(stream){
  new Promise((resolve, reject) => {
    docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
  })
}
function buildImage(userid, lang, src, callback){
  let imageTag = `${userid}${lang}`;
  let localDir =  directories[lang];
  let srcFile  = `src${extensions[lang]}`

  fs.writeFileSync(`${localDir}\\${srcFile}`,src)

  docker.buildImage(
    {context: localDir,src: ['Dockerfile', srcFile]},
    {t: imageTag},
    async (stream)=>{
      callback(stream)
      /*await docker.modem.followProgress(stream,
        (err,output)=>{console.log(output)},
        (data)=>{})*/
    })

  console.log(localDir)
}

async function executeCode(userid, lang, src, input, callback){

}


let code = `public class test {

  public static void main(String[] args) {
  System.out.println("Hello World");
}
}

`
buildImage('nazmiyilmaz12345','java',code, resolveImage)





