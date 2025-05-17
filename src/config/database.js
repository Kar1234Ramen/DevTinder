const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://ramenkar8:XkkUwmUt6ONsb46z@cluster0.yt2t5r4.mongodb.net/devTinderdb"
    )
}

module.exports = connectDB
