const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1/subscribed-users")
.then(() =>console.log("mongodb connected"))
.catch((e) =>console.log(e));

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    }
  })
  
  const User = mongoose.model("User", userSchema)

module.exports = User