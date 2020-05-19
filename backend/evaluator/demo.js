const evaluator = require('./evaluator')
const Bundle = require('./bundle')
const runner = require('./runner')



async function test1(){

    let {lang, files, inputs, outputs} = require('./template').javaTemplate;
    let bundle = new Bundle(lang, inputs, outputs)
    bundle.addAll(files)
    
    evaluator.evaluate('user1', bundle, (err, score, evaluation)=>{
        
        if(err){return console.log(err);}
        
        console.log(`score is ${score}`);
        
        for(e of evaluation){
            console.log(e);
        }
    });
}

async function test2(){

    let {lang, files, inputs, outputs} = require('./template').cTemplate;
    let bundle = new Bundle(lang, inputs, outputs)
    bundle.addAll(files)
    
    evaluator.evaluate('user2', bundle, (err, score, evaluation)=>{
        
        if(err){return console.log(err);}
        
        console.log(`score is ${score}`);
        
        for(e of evaluation){
            console.log(e);
        }
    });
}

async function test3(){

    let {lang, files, inputs, outputs} = require('./template').cppTemplate;
    let bundle = new Bundle(lang, inputs, outputs)
    bundle.addAll(files)
    evaluator.evaluate('user3', bundle, (err, score, evaluation)=>{
        
        if(err){return console.log(err);}
        
        console.log(`score is ${score}`);
        
        for(e of evaluation){
            console.log(e);
        }
    });
}

async function test5(){

    let {lang, files, inputs, outputs} = require('./template').pythonTemplate;
    let bundle = new Bundle(lang, inputs, outputs)
    bundle.addAll(files)
    
    evaluator.evaluate('user5', bundle, (err, score, evaluation)=>{
        
        if(err){return console.log(err);}
        
        console.log(`score is ${score}`);
        
        for(e of evaluation){
            console.log(e);
        }
    });
}

async function test6(){

    let {lang, files, inputs, outputs} = require('./template').exerciseTemplate;
    let bundle = new Bundle(lang, inputs, outputs)
    bundle.addAll(files)

    try{

     let output = await runner.runCode(bundle,'user6')
     console.log(output)
    }
    catch(e){
        console.log(e)
    }

}


test1();
test2();
test3();
test5();
//test6();