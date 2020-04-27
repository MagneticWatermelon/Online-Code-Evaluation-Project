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

    'c++' : `
    
    
    
    
    
    `,

    'pythton': `
    
    
    
    
    
    
    
    `


}

