const express = require('express');
const mongoose = require('mongoose');
const app = express();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const WebSocketServer = require('ws');
const { PORT, MONGODB_URI } = require('./config.js')
const server = require('http').createServer();
const wss = new WebSocketServer.Server({server});


const DataSchema = mongoose.Schema({
    title: String,
    type: String,
    description: String
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = require("../src/subscriber-id-storage.js")
const Data =mongoose.model('data',DataSchema)


wss.on("connection",async (ws) => {
    console.log('websocket connected');
    const pipeline = [ { $match: { runtime: { $lt: 15 } } } ];
const changeStream = Data.watch(pipeline);
    if(changeStream){console.log(changeStream.value)}    
    changeStream.on('change', (changeHandler) => {
        console.log("Haiiii")
        if (changeHandler.operationType === 'insert') {
            const insertedValue = changeHandler.fullDocument.value;
            console.log('New insertion:', insertedValue);
        
        User.find({}, (err, users) => {
            if (err) {
                console.error('Error retrieving users:', err);
                return;
            }
            users.forEach((user) => {
                const { email } = user;
                // eslint-disable-next-line no-undef
                Sendmail(email,insertedValue);
            });
        })
        }
    });
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
