const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js')



const notification = (req, res) => {

    const { userEmail } = req.body;
    console.log(userEmail)
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
            name : "Subscription Notification",
            intro: "Thank You for Subscribing our News Letter.",
            outro: "We will notify you when there is a new update."
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "Subscription Notification",
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


module.exports = {
    notification
}