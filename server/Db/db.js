const mongoose= require("mongoose");
const config= require('dotenv').config();
const Db=async ()=>{
    
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch ((err)=>{
        console.log(err)
        process.exit(1);
    })

 
}  

module.exports=Db;