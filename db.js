const mongoose = require("mongoose")
const mongoURI = "mongodb+srv://wwwpraffulkumar121:9KDUmaSgozVIkbFu@cluster0.qavpl6k.mongodb.net/?retryWrites=true&w=majority";

const mongoDB = async()=>{
    await mongoose.connect(mongoURI, () => {
        console.log("connected");
    });
}

module.exports = mongoDB;
