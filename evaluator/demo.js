const evaluator = require('./evaluator')
const bundle = require('./bundle')



async function u1(){

    let b = require('./template').bundleTemplate;
    
    let source = new bundle(b.lang, b.inputs, b.outputs)
    
    source.addAll(b.files)
    
    evaluator.evaluate('nyilmaz', source, (err, score, evaluation)=>{
        
        if(err){return console.log(err);}
        
        console.log(`score is ${score}`);
        
        for(e of evaluation){
            console.log(e);
        }
    });
}

async function u2(){

    let b = require('./template').bundleTemplate2;
    
    let source = new bundle(b.lang, b.inputs, b.outputs)
    
    source.addAll(b.files)
    
    evaluator.evaluate('oekinci', source, (err, score, evaluation)=>{
        
        if(err){return console.log(err);}
        
        console.log(`score is ${score}`);
        
        for(e of evaluation){
            console.log(e);
        }
    });
}


async function u3(){

    let b = require('./template').bundleTemplate3;
    
    let source = new bundle(b.lang, b.inputs, b.outputs)
    
    source.addAll(b.files)
    
    evaluator.evaluate('yonuk', source, (err, score, evaluation)=>{
        
        if(err){return console.log(err);}
        
        console.log(`score is ${score}`);
        
        for(e of evaluation){
            console.log(e);
        }
    });
}


u1();
//u2();
//u3();