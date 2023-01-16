const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.json())
const {connect} = require('./config/db')
const {UserRoute} = require('./Routes/userRoute')
const {PostRoute} = require('./Routes/postRoute')
const {authentication} = require('./middleware/authentication')
const cors = require('cors')
app.use(cors({
    
}))

app.use('/user',UserRoute)
app.use(authentication)
app.use('/post',PostRoute)









app.get('/',(req,res)=>{
    res.send('Welcome Home')
})



app.listen(process.env.port,async()=>{
    try{
        await connect
        console.log('Connected to Mongo')
    }catch(err){
      console.log(err)

    }
    console.log('Running 4500')
})