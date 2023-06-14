const express = require('express');
const mongoose = require('mongoose');
const app = express();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const WebSocketServer = require('ws');
const { PORT, MONGODB_URI } = require('./config.js')
const server = require('http').createServer();
const wss = new WebSocketServer.Server({server});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = require("../src/subscriber-id-storage.js")
const MyModel =require("./data.js")
const db =     mongoose.connect(MONGODB_URI)
    .then(() =>console.log("mongodb connected"))
    .catch((e) =>console.log(e));

wss.on("connection",async (ws) => {
    console.log('websocket connected');
    ws.on('message',(message) => {
        const data=JSON.parse(message);
        if (data.action === 'insert') {
            // Example: Insert data into MongoDB
            const newRecord = new MyModel(data.payload);
            newRecord.save((err) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Record inserted successfully');
              }
            });

            User.find({}, (err, users) => {
                if (err) {
                    console.error('Error retrieving users:', err);
                    return;
                }
                users.forEach((user) => {
                    const { email } = user;
                    Sendmail(email, data);
                });
            })
          } 
    })
    /*const ChangeData = db.collection('data').watch();
    
        ChangeData.on('change',(change) =>{
            console.log('Something has changed')
            const {details}=change;
            User.find({}, (err, users) => {
                if (err) {
                    console.error('Error retrieving users:', err);
                    return;
                }
                users.forEach((user) => {
                    const { email } = user;
                    Sendmail(email, details);
                });
            })
        })*/
})
    



const Sendmail = (req,res) =>{
    const { userEmail,details } = req.body;
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
