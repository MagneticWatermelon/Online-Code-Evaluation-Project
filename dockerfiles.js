/* This module exports an array of pre-defined dockerfiles
   for compiling and running code with respect to its language
*/

module.exports = {

    'java:8' : {

        name:'Dockerfile',
        content:`
            
            FROM openjdk:8
            COPY . /
            WORKDIR /
            RUN javac *.java
            CMD ["java","main"]
        `
    },

    'python:3': {

        name:'Dockerfile',
        content:`
            
            FROM python:3
            COPY . /
            WORKDIR /
            CMD ["python","main.py"]
        `
    },

    'golang:1.13':{

        name:'Dockerfile',
        content:`
            FROM golang:1.13
            COPY . /
            WORKDIR /
            RUN go build -o main .
            CMD ["./main"]
        `

    },

    'c++' : `
    
    
    
    
    
    `,

    

}

