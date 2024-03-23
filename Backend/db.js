const mongoose=require('mongoose');

// require('dotenv').config({ path: 'Backend\.env'})

const mongoUri="mongodb+srv://INoteBook:Note123@cluster1.dur1itu.mongodb.net/?retryWrites=true&w=majority"
// const mongoUri=process.env.REACT_APP_CLOUD_STORE
console.log(mongoUri)
const connectToMongo=async()=>{
    console.log('Before making the connection')
    mongoose.connect(mongoUri)
    await console.log("Connected Successfully")
}
module.exports=connectToMongo;
// connectToMongo();