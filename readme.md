## MUGS Messaging Queue Service Using RabbitMQ

**Use Case** :  This is a Message Queue service for sending Emails in a Queue Style. Here the grievances requested by the user will be consolidated in the Queue in a JSONObject and the consolidated  JSONObjects will be consumed through REST API calls.

**REST APIs** will be accessed using `http://localhost:7000` 
<pre>
    <code>http://localhost:7000/addMessageToQueue</code>
</pre>

The above Route `/addMessageToQueue` adds the inserted object in JSON format.
Preferably the JSONObject should be :
<pre>
    <code>
     {  
         "to": "siddharthraja9849@gmail.com",
        "templateId": "d-0438e4d47ad6491ba4a52d3da90fa62f",
        "from": "vnnair39@gmail.com",
        "dynamicTemplateData": {
        "id": 6789
        }
    }
    </code>
</pre>

[producer.js](./new_task.js) is dedicated to add Messages into Queue.
This JSON object considered here  is provided by the SendGrid Emailing Service !! 

<pre>
    <code>http://localhost:7000/consumeMessagesFromQueue</code>
</pre>

The above Route `/consumeMessagesFromQueue` consumes the inserted JSONobject inside the Queue.
[worker.js](./worker.js) is dedicated to consume Messages from Rabbit Queue.

## Future Scope : 
Integrating SendGrid API service with appropriate Keys inside [worker.js](./worker.js) to send Emails.