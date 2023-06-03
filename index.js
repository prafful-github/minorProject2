const express = require("express");
const app = express()
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

// const mongoURI = "mongodb+srv://wwwpraffulkumar121:9KDUmaSgozVIkbFu@cluster0.qavpl6k.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongoURI = "mongodb://wwwpraffulkumar121:9KDUmaSgozVIkbFu@ac-ynbuph5-shard-00-00.qavpl6k.mongodb.net:27017,ac-ynbuph5-shard-00-01.qavpl6k.mongodb.net:27017,ac-ynbuph5-shard-00-02.qavpl6k.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-y7e5or-shard-0&authSource=admin&retryWrites=true&w=majority"
const FoodCategory = require('./src/models/foodCategory');
const FoodItems = require('./src/models/food_items');

//MngoDB connections
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongoURI);
    console.log("database connected");
    global.food_items = await FoodItems.find();
    global.foodCategory = await FoodCategory.find();

}




app.get('/', async (req, res)=> {
    res.send("hello world")
    
})
app.use(express.json())
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

if (process.env.NODE_ENV == "production"){
    app.use(express.static("mernapp/build"))
}

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})