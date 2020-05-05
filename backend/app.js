const express   = require('express');
const app       = express();    

const authRoutes    = require('./routes/auth')
const courseRoutes  = require('./routes/course')


app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/auth',authRoutes)
app.use('/course', courseRoutes)

app.listen(8080)