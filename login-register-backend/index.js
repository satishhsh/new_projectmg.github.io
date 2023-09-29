import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
// mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("DB connected")
// })

const connectToMongo=async ()=>{
    await mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB");
    console.log("Connected to mongo");
};
connectToMongo();
// module.exports = connectToMongo;
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate the input fields.
      if (!email || !password) {
        res.send({ message: "Please fill in all of the required fields." });
        return;
      }
  
      // Find the user in the database.
      const user = await User.findOne({ email });
  
      // If the user is not found, send an error message.
      if (!user) {
        res.send({ message: "User not found." });
        return;
      }
  
      // Check if the password is correct.
      if (password !== user.password) {
        res.send({ message: "Incorrect password." });
        return;
      }
  
      // Send the user object and a success message.
      res.send({ message: "Login successful.", user });
    } catch (error) {
      console.log(error);
      res.send({ message: "An error occurred while trying to log in." });
    }
  });
app.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Validate the input fields.
      if (!name || !email || !password) {
        res.send({ message: "Please fill in all of the required fields." });
        return;
      }
  
      // Check if the user is already registered.
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.send({ message: "User already registered." });
        return;
      }
  
      // Create a new user.
      const user = new User({ name, email, password });
  
      // Save the user to the database.
      await user.save();
  
      // Send a success message.
      res.send({ message: "User successfully registered." });
    } catch (error) {
      console.log(error);
      res.send({ message: "An error occurred while trying to register the user." });
    }
  });

app.listen(9001,() => {
    console.log("BE started at port 9002")
})