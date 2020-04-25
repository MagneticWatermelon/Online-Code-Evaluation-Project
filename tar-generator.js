const tar = require('tar-stream')
const fs  = require('fs')



data = {
    lang  : 'java', 
    files : [
        {
            name: 'src.java',
            content:`public class test {


                public static void main(String[] args) {
                    System.out.println("hello world");
                }
            }` 
        },

        {
            name:'Dockerfile',
            content:`
                FROM openjdk:8
                COPY . .
                RUN javac src.java
                CMD ['java','src']
            `
        }
    ]
}


function convert(data){
    let pack = tar.pack()
    data.files.forEach(file => {
        pack.entry({name:file.name},file.content)
    });


    let path = './test.tar'
    let tarball = fs.createWriteStream(path)

    pack.pipe(tarball)

    tarball.on('close', function () {
    console.log(path + ' has been written')
    fs.stat(path, function(err, stats) {
    if (err) throw err
    console.log(stats)
    console.log('Got file info successfully!')
    })
    })
}


convert(data)





