const express =require("express")

const app=express()

app.use("/",(re,res)=>{
    res.send("Hello from the server")
})

app.listen(3000,()=>{
    console.log("Server listening on port 3000")
})