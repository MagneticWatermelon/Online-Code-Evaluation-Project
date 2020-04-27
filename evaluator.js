module.exports.evaluate = evaluate;

const runner = require('./runner')

/*
*/
function getResults(bundle, imageName){
    return new Promise((resolve,reject)=>{
        runner.build(bundle,{t:imageName},(err, imagename)=>{
            if(err){reject(err)}
            runner.getResults(imageName,bundle.getInputs())
            .then(results=>{
                

                console.log(results)

                
            })
        
        })
    })
}

function evaluate(userid, bundle){

    getResults(bundle, userid)

    .then(resultset=>{

        console.log(resultset)
    })

    .catch(err=>{

        console.log(err)
    })

}

let template = require('./template')
const bundle = require('./bundle')
        
let data = new bundle(template.lang, template.inputs, template.outputs)
data.addAll(template.files)

evaluate('nyilmaz', data);






























