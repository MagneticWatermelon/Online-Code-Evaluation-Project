const express   = require('express');
const app       = express();
const dotenv    = require('dotenv')
const cors      = require('cors')
dotenv.config('./env')

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

const port = process.env.PORT || 8080

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

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
    app.listen(port)
})

