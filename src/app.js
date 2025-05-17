const express =require("express");
const connectDB = require("./config/database");
const app=express();
const User= require("./models/user");

app.use(express.json())


app.post("/signup",async (req,res)=>{
    const user =new User(req.body)

    try{ 
        await user.save();
        res.send("User added successfully")
    } catch (err){
        res.status(400).send("Error saving the user: "+ err.message)
    }
    
})

app.get("/feed",async (req,res)=>{
    
    try{
        const users= await User.find({})
        res.send(users)
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

app.get("/user", async (req, res)=>{
    
    const userEmail = req.body.emailId
    console.log(userEmail)
    try{
        const user = await User.findOne({emailId : userEmail})
        if(!user){
            res.status(404).send("User not found")
        } else{
            res.send(user)

        }

    } catch(err){
        res.status(400).send("Something went wrong")
    }
})

app.delete("/user", async(req,res)=>{

    const userID = req.body.userID
    try{
        const user = await User.findByIdAndDelete(userID)

        res.send("User deleted successfully")
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

app.patch("/user", async(req,res)=>{
    const userID = req.body.userID
    const data = req.body

    try{
        const user = await User.findByIdAndUpdate(userID,data,{
            returnDocument:"after"
        })
        console.log(user)
        res.send("User updated")
    } catch(err){
        res.status(400).send("Something went wrong")
    }
})

app.patch("/user/email", async(req,res)=>{
    const emailId = req.body.emailId
    const data = req.body

    try{
        const user = await User.findOneAndUpdate({ emailId: emailId },data,{
            returnDocument:"after"
        })
        console.log(user)
        res.send("User updated successfully")
    } catch(err){
        res.status(400).send("Something went wrong")
    }
})

connectDB().then(()=>{
    console.log("Database connected")
    app.listen(3000,()=>{
        console.log("Server listening on port 3000")
    })
})
.catch((err)=>{
    console.log("DB connection failed")
})
 