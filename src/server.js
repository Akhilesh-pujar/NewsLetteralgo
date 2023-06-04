const express=require("express")
const User = require("./subscriber-id-storage.js")
const cors=require("cors")
const app=express()
const appRoute = require('./routes/route.js')
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
})
app.use('/api',appRoute);

app.listen(PORT,() => {
  console.log("Port connected");
})


