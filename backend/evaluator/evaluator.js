module.exports.evaluate = evaluate;

const runner = require('./runner')

/*function for building and generating outputs from the code
*/
async function getResults(bundle, imageName){

    let buildsuccess = await runner.buildImage(bundle,{t:imageName})

    if(!buildsuccess){throw 'compilation error!'}

    let results      = await runner.getResults(imageName,bundle.getInputs())

    return results;
}

/*function for evaluating the attempt
*/
async function evaluate(userid, bundle, callback){
    try {

        first = Date.now()
        let resultset = await getResults(bundle,userid)

        let evaluation = [];
        let overall    = 0;

        let answers    = bundle.getOutputs();
        let length     = answers.length;

        if(length != resultset.length){
            throw 'outputs\' length is not valid'
        }

        for(let a = 0 ; a < length ; a++){

            let output = resultset[a]
            let answer = answers[a]
            let score  = compare(output,answer)

            overall += score * (1/length);

            evaluation.push({
                status : (score == 0) ? 'wrong' : 'correct',
                given  : output,
                answer : answer
            })
        }

        console.log(Date.now()-first)
        callback(null, overall, evaluation);
    } 
    catch (e) {
        callback(e,null,null)
    }
}


function compare(o1, o2){
    
    if(o1 == o2){
        return 1.0;
    }
    else if(o1.join(' ') == o2.join(' ')){
        return 1.0;
    }
    else if(o1.join('\n') == o2.join('\n')){
        return 1.0;
    }
    else{
        return 0.0;
    }
}






























