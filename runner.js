module.exports.run = run;

const Docker = require('dockerode')
const fs = require('fs')

const hostIP = '192.168.99.100'
const hostPort = 2376

docker = new Docker({host:hostIP, port:hostPort});


async function build(imageName, callback){
    await docker.buildImage({
        context: __dirname.concat('/java'),
        src: ['Dockerfile', 'test.java']
      }, {t: imageName}, function (err, response) {
                return callback(response)
      })
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


