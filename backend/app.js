const express   = require('express');
const app       = express();    

const authRoutes    = require('./routes/auth')
const courseRoutes  = require('./routes/course')
const userRoutes    = require('./routes/user')
const database      = require('./util/database')

const dotenv        = require('dotenv')
dotenv.config('./env')


app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/auth',authRoutes)
app.use('/course', courseRoutes)
app.use('/user', userRoutes)

database.connectToDB((result)=>{
    console.log('Connectted to DB, starting server...')
    app.listen(8080)
})

