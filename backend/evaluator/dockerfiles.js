/* This module exports an array of pre-defined dockerfiles
   for compiling and running code with respect to its language
*/
const dockerfiles = {

    'java:8' :         `FROM        frolvlad/alpine-java:jdk8-slim
                        COPY        . /
                        RUN         javac main.java
                        CMD         ["java","main"]
                       `,
    
    'node:14':         `FROM        node:14-slim
                        COPY        . /
                        CMD         ["node","./main.js"]
                       `,

    'python:3':        `FROM        python:3-slim
                        COPY        . /
                        WORKDIR     /
                        CMD         ["python","main.py"]
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

