const express   = require('express');
const app       = express();    

const authRoutes        = require('./routes/auth')
const courseRoutes      = require('./routes/course')
const userRoutes        = require('./routes/user')
const submissionRoutes  = require('./routes/submission')
const assignmentRoutes  = require('./routes/assignment')
const questionRoutes    = require('./routes/question')
const notificationRoutes= require('./routes/notification')
const announcementRoutes= require('./routes/announcement')
const commentRoutes     = require('./routes/comment')
const resourceRoutes    = require('./routes/resource')

const database      = require('./util/database')

const dotenv        = require('dotenv')
dotenv.config('./env')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
  });

app.use('/auth',authRoutes)
app.use('/course', courseRoutes)
app.use('/user', userRoutes)
app.use('/submission', submissionRoutes)
app.use('/assignment', assignmentRoutes)
app.use('/question',questionRoutes)
app.use('/notification',notificationRoutes)
app.use('/announcement',announcementRoutes)
app.use('/comment',commentRoutes)
app.use('/resource', resourceRoutes)


database.connectToDB((result)=>{
    console.log('Connectted to DB, starting server...')
    app.listen(8080)
})

