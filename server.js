const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const runner = require('./runner');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


app.set('view-engine','ejs')

.get('/', (req,res)=>{
    res.redirect('/home'); 
})

.get('/home',(req,res)=>{
      var output = req.flash('output')

      if(output.length!=0){
        return res.render('home.ejs', {'output':output});
      }

      return res.render('home.ejs',{'output':null})
})

.post('/execute-code', (req,res)=>{

    var code = req.body.code_src
    
    let inputs =[['1','9'],['2','4'],['9','7'],['10','85']]
      
    runner.evaluateAttempt('nyilmaz','java',code,[[]],[],(resultset)=>{
        req.flash('output',resultset.toString())
        return res.redirect('/home')

    })
})
app.listen(8080);