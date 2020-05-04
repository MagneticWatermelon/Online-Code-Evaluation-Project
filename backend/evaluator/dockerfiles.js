/* This module exports an array of pre-defined dockerfiles
   for compiling and running code with respect to its language
*/
const dockerfiles = {

    'java:8' :         `FROM        openjdk:8
                        COPY        . /
                        RUN         javac main.java
                        CMD         ["java","main"]
                       `,

    'python:3':        `FROM        python:3
                        COPY        . /
                        WORKDIR     /
                        CMD         ["python","main.py"]
                       `,

    'golang:1.13':     `FROM        golang:1.13
                        COPY        . /
                        WORKDIR     /
                        RUN         go build -o main main.go
                        CMD         ["./main"]
                       `,

    'c++':             `FROM gcc:8
                        COPY . /
                        WORKDIR /
                        RUN g++ -Wall main.cpp -o main
                        CMD ["./main"]
                       `,

    'c':               `FROM gcc:8
                        COPY . /
                        WORKDIR /
                        RUN gcc -o main main.c
                        CMD ["./main"]
                       `
}

function getDockerFile(lang){
    if(lang==null){return;}
    return {
        name    : 'Dockerfile',
        content : dockerfiles[lang]
    };
}


module.exports.getDockerFile = getDockerFile;

