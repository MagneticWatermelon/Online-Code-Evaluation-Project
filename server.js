const express = require('./backend/node_modules/express');
//const cors = require('./backend/node_modules/cors');
const mongoose = require('./backend/node_modules/mongoose');
const {Course, addStudentToCourse} = require('./backend/models/course');
const {Assignment} = require('./backend/models/assignment');

require('./backend/node_modules/dotenv').config();
const app = express();
const port = process.env.PORT || 3010;
//app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://OCES:ocesproject@mycluster-dvjk4.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
console.log("saaaalih");
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to DB');
});
addStudentToCourse("5eb3084223479d265c0f3cc7", "5eb1697c70abfb181839d82a", (err) => {
    if(err) return console.log(err);      
    //return console.log(res);
})

/*
getAssignments("5eb092c676d2394ed6ae3591", (err, res) => {
    if(err) return console.log(err);      
    return console.log(res);
   });

  */ 
   

app.listen(port, () => {
console.log('Server is listening...');
});

