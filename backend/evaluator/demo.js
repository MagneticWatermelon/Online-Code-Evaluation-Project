const evaluator = require('./evaluator')
const bundle = require('./bundle')
const runner = require('./runner')



async function test1(){

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

async function test2(){

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


async function test3(){

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


async function test4(){

    let b = require('./template').bundleTemplate4;
    
    let source = new bundle(b.lang, b.inputs, b.outputs)
    
    source.addAll(b.files)

    try{

     let output = await runner.runCode(source,'nyilmaz')
     console.log(output)
    }
    catch(e){
        console.log(e)
    }

}


test1();
test2();
test3();
test4();