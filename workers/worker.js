var amqp=require('amqplib/callback_api')


module.exports.consumer=()=>{
    try{

        amqp.connect('amqp://localhost',(err0,connection)=>{
            if(err0)throw err0;
            
            connection.createChannel((err1,channel)=>{
                if(err1)  throw err1;
                var queue='MUGS-EMAIL'
                
                channel.assertQueue(queue,{durable:false})
                channel.consume(queue,async(message)=>{
                    
                var data=await JSON.parse(message.content.toString())
                    
                    
                await console.log("Received Message :",data[0])
                    
                    // Here you need to specify the mail method of Sendgrid API

                },{
                    noAck:true // If message is unsuccesfull then Ack is not received and message is requeued back to RabbitMQ
                })

            })

            setTimeout(()=>{
                connection.close()
                //process.exit(0)
            },5000)

        })
        return 1;

    }
    catch{
        return 0;
    }
    return 1;
        
}
