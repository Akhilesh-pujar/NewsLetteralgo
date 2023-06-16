const express = require('express');
const mongoose = require('mongoose');
const app = express();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const WebSocketServer = require('ws');
const { PORT, MONGODB_URI } = require('./config.js')
const server = require('http').createServer();
const wss = new WebSocketServer.Server({server});
const user=require("../src/routes/route.js")
const axios=require("axios")

mongoose.connect(MONGODB_URI)
.then(()=>{console.log("mongoodb connected")})
.catch((e)=>{console.log(e)})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

wss.on("connection",async (ws) => {
    console.log('websocket connected');
    
const changeStream = mongoose.connection.collection('data').watch();
    if(changeStream){console.log(changeStream.value)}    
    changeStream.on('change', (change) => {
        console.log("Database Changes Occured")
        if (change.operationType === 'insert') {
            console.log('New insertion:', change.fullDocument);
            const users =  getallusers();
            async function getallusers() {
                try {
                  const response = await axios.get('https://api.theautring.com/api/v1/getalluser', {
                    timeout: 10000
                  });
                  if (!response.ok) {
                    throw new Error('Request failed');
                  }
                  console.log("data fetched")
                  const data = await response.json();
                  console.log(data);
                  return data; 
                } catch (error) {
                  console.error('Error:', error);
                  
                }
              }
              users.froEach(user =>{
                Sendmail(user,change.fullDocument)
              })
        }    
    });
})

const Sendmail = (req,res) =>{
    const { userEmail,details } = req.body;
    console.log("sending mails")
    let config = {
        service : 'gmail',
        auth : {
            user: "023neeraja@gmail.com",
            pass: "vsjvmijivxtamxan"
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "New posted data",
            intro: details,
            outro: "Checkout the new updates"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : "023neeraja@gmail.com",
        to : userEmail,
        subject: "New posted data",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

}

server.listen(PORT, function () {
    console.log(`im listening at ${PORT}`);
});
