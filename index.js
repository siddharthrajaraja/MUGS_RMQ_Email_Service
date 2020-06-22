let express= require('express')
const app =express()
let bodyParser = require('body-parser').json();
let dotenv=require('dotenv').config()

var {consumer}=require('./workers/worker.js')
var {producer}=require('./workers/new_task.js')

app.post('/addMessageToQueue',bodyParser,async(req,res)=>{
    console.log(req.body)
    
    if(await producer(req.body))
        res.status(200).json({"flag":"Message produced Successfully!!"})
    else
    res.status(400).json({"flag":"Some error occurred while Producing Message to Queue!!"})
})

app.get('/consumeMessagesFromQueue',async(req,res)=>{

    if(await consumer())
        res.status(200).json({"flag":"Message consumed Successfully!!"})
    else
        res.status(400).json({"flag":"Some error occurred while Consuming Message from Queue!!"})
})

app.listen(process.env.PORT,(err,res)=>{
    if(err)throw err;
    console.log("Connected to ",process.env.PORT," RabbitMQ AMQP service !!")
})