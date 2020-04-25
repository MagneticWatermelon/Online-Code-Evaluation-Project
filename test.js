const Docker    = require('dockerode')

const hostIP = '192.168.99.100'
const hostPort = 2376

docker = new Docker({host:hostIP, port:hostPort});


docker.buildImage('test.tar',{t:'testimage'},()=>{})
  
  

