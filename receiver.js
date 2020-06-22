var amqp=require('amqplib/callback_api')

amqp.connect('amqp://localhost',(err0,connection)=>{
    if(err0)throw err0;
    
    connection.createChannel((err1,channel)=>{
        if(err1)  throw err1;
        var queue='hello'
        
        channel.assertQueue(queue,{durable:false})
        
        channel.consume(queue,(message)=>{
            
            var data=message.content.toString()
            console.log("Received Message :",data['to'])
                
            

        },{
            noAck:true
        })

    })


})