var amqp=require('amqplib/callback_api');

module.exports.producer=(messageObj)=>{
    try{
        amqp.connect('amqp://localhost',(err,connection)=>{
            if(err)throw err;
            connection.createChannel(async(err1,channel)=>{
                if(err1)throw err1;
                var queue='MUGS-EMAIL';
            
        
                channel.assertQueue(queue,{durable:false})
                    
                    var message=[messageObj];
                    await channel.sendToQueue(queue,Buffer.from(JSON.stringify(message)));
                    await console.log("Meesage inside the taskk !!",message)
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
