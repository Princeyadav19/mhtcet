//express setting
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//env 
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.port;

//database connection
const mongourl = process.env.DATABASE_URL;
mongoose.connect(mongourl,{useNewUrlParser:true,useUnifiedTopology:true}).then((res)=>{
    console.log("connected to database");
})

//router
const router = require('./routes/web.js');
app.use('/',router)








//connection to port
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

