module.exports.evaluate = evaluate;

const runner = require('./runner')

/*function for building and generating outputs from the code
*/
function getResults(bundle, imageName){
    return new Promise((resolve,reject)=>{

        runner.build(bundle,{t:imageName})

        .then(info=>{

            runner.getResults(imageName,bundle.getInputs())
            .then(results=>{
                resolve(results)
            })

            .catch(err=>{
                reject(err)
            })

        })

        .catch(err=>{
            reject('build has failed')
            console.log(err)
        })
    })
}

/*function for evaluating the attempt
*/
function evaluate(userid, bundle){

    getResults(bundle, userid)

    .then(resultset=>{

        console.log(resultset)
    })

    .catch(err=>{

        console.log(err)
    })

}






























