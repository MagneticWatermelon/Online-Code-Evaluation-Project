module.exports.evaluate = evaluate;

const runner = require('./runner')

/*function for building and generating outputs from the code
*/
async function getOutputs(bundle, imageName){

    let buildsuccess = await runner.buildImage(bundle,{t:imageName})

    if(!buildsuccess){throw 'compilation error!'}

    let results      = await runner.getOutputs(imageName,bundle.getInputs())

    return results;
}

/*function for evaluating the attempt
*/
async function evaluate(userid, bundle, callback){
    try {

        let outputs = await  getOutputs(bundle,userid);
        let answers = bundle.getOutputs();

        let evaluation  = [];
        let score       = 0.0;
        let length      = answers.length;

        if(length != outputs.length){
            throw 'outputs\' length is not valid'
        }

        for(let a = 0 ; a < length ; a++){

            let output = outputs[a]
            let answer = answers[a]

            let isCorrect  = compare(output,answer)

            score += isCorrect ? (1/length) : 0;

            evaluation.push({
                'status' : isCorrect ? 'correct' : 'wrong',
                'output' : output,
                'answer' : answer
            })
        }

        callback(null, score, evaluation);
    } 
    catch (e) {
        callback(e,null,null)
    }
}


function compare(o1, o2){
    
    if(o1 == o2){
        return true;
    }
    else if(o1.join(' ') == o2.join(' ')){
        return true;
    }
    else if(o1.join('\n') == o2.join('\n')){
        return true;
    }
    else{
        return false;
    }
}






























