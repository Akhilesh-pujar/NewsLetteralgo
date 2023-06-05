const express=require("express")
const User = require("./subscriber-id-storage.js")
const cors=require("cors")
const app=express()
const appRoute = require('./routes/route.js')
const PORT =process.env.PORT || 5000;
const axios = require("axios");

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
        return res.json("exist")
      }
      else{
        
        if(isChecked===true){
            const newUser = new User(data);
            await newUser.save();
        }
        await axios.post("http://localhost:5000/api/subscribed/notification", { userEmail: email });
        return res.json("notexist")
      }
    }
  catch(e){
      return res.json("notexist")
  }
  
})
function  middleware(req, res, next) {
  const email = req.body.email; 
  req.email = email; 
  next();
}
/*appRoute.get("/some-route", (req, res) => {
  const email = req.email; 
  console.log(email)
  res.send(`Email: ${email}`);
});*/
app.use('/api',middleware,appRoute);

app.listen(PORT,() => {
  console.log("Port connected");
})


