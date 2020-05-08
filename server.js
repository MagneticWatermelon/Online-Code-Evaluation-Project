const express = require('./backend/node_modules/express');
//const cors = require('./backend/node_modules/cors');
const mongoose = require('./backend/node_modules/mongoose');
const{createQuestion,deleteQuestion,updateQuestion,getQuestion} = require('./backend/models/question');
const{saveSubmission,getFiles,getSubmission,updateEvaluation,updateScore,deleteSubmission} = require('./backend/models/submission');
const{addUser,User,checkUser,updatePassword,getUser,updateUser,deleteUser,addProfilePhoto,getGivenCourses,getTakenCourses} = require('./backend/models/user');
const {Course, createCourse} = require('./backend/models/course');
const{createNotification,getNotification,deleteNotification} = require('./backend/models/notification');
require('./backend/node_modules/dotenv').config();
const app = express();
const port = process.env.PORT || 4000;
//app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://OCES:ocesproject@mycluster-dvjk4.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to DB');
});
const array = [ ['1.1','1.2'] , ['2.1','2.2'] , ['3.1','3.2'] ];
const ev_for_array = ['i1','i2',"i3"];
const evaluatin_array = [
    {"status":"Wrong","outputs":ev_for_array},
    {"status":"Correct","outputs":ev_for_array}
]
const sub_files = [{
    "nameofFile":"main.java",
    "subimittedcode":"scanner main gibi seyler deneme "
},{
    "nameofFile":"class1.java",
    "subimittedcode":"classda tanımlana şeyler  "
}]
app.listen(port, () => {
console.log('Server is listening...');
});
/*createNotification("5eb1697c70abfb181839d82a","5eb3cd86fcbaec1da4f50cfb","Denene Notification","Deneme Notification", (err)=>{
        if(err) return console.log(err);
});*/
deleteNotification("5eb576ea0228b71a6475a88d",(err)=>{
        if(err) return console.log(err);
      //  console.log(data);
});

/*getFiles("5eb1dc33418a8145ac3fb12e",(err,res)=>{
    if(err) return console.log(err);console.log(res);
})*/


/*addUser("SadikCoban","SadikCoban.atalay@agu.edu.tr",0,"Salih12345",(err, user)=>{
    if(err){return console.log(err)}
    console.log(user)
});*/
/*checkUser("salihmert.atalay@agu.edu.tr","Salih12345",(err, user)=>{
    if(err){return console.log(err)}
    console.log(user)
});*/
/*updatePassword("5eb2a8d54b576c4a94b1a05a","YeniSİfre",(err, user)=>{
    if(err){return console.log(err)}
    console.log(user)
});*/
//$2b$10$TfL6b69R77gW6VewdACEp.aDfkS53eH1z1qYRvjnZufJcx.6JmlSK
/*getUser("5eb1697c70abfb181839d82a",(err,user)=>{
    if(err) return console.log(err);
    console.log(user);
});*/
/*updateUser("5eb2a8d54b576c4a94b1a05a","Salih",null,(err,user)=>{
    if(err) return console.log(err);
     console.log(user);
});*/
/*deleteUser("5eb1697c70abfb181839d82a",(err)=>{
    if(err) return console.log(err);
});*/
/*addProfilePhoto("5eb1697c70abfb181839d82a","Update Denemesi",(err)=>{
    if(err) return console.log(err);
})*/
/*getGivenCourses("5eb1697c70abfb181839d82a",(err,res)=>{
    if(err) return console.log(err)
    console.log(res);
});*/
/*getTakenCourses("5eb1697c70abfb181839d82a",(err,res)=>{
    if(err) return console.log(err);
    console.log(res);
});*/
