const express=require("express")
const User = require("./subscriber-id-storage.js")
const cors=require("cors")
const app=express()
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { EMAIL, PASSWORD } = require('./env.js')
const PORT =process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.post("/",async(req,res) =>{
  const{email,isChecked}=req.body

  const data={
    email:email,
    }
    try{
      const check=await User.findOne({email:email})
      
      if(check){
        res.json("exist")
      }
      else{
        res.json("notexist")
        if(isChecked===true){
            const newUser = new User(data);
            await newUser.save();
        }
        
      }
      
  }
  catch(e){
      res.json("notexist")
  }
  
  let config = {
    service : 'gmail',
    auth : {
        user: EMAIL,
        pass: PASSWORD
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
        intro: "Thanks for Subscribing our NewsLetter",
        outro: "We will notify you when there is update in News "
    }
}

let mail = MailGenerator.generate(response)

let message = {
    from : EMAIL,
    to : email,
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

})

app.listen(PORT,() => {
  console.log("Port connected");
})


