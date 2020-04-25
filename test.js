const Docker    = require('dockerode')

const hostIP = '192.168.99.100'
const hostPort = 2376

docker = new Docker({host:hostIP, port:hostPort});


function build(callback){
    docker.buildImage('test.tar',{t:'testimage'})

    .then(stream=>{
        new Promise((resolve, reject) => {
            docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
        })
    })
}
  
build()
  

