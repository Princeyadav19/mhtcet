//express setting
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const mongodbSession = require('connect-mongodb-session')(session);

const app = express();

//env 
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.port;

// putting middleware to read req.body data
app.use(express.urlencoded({extended:true}));

//set view
app.set('view engine','ejs');

//database connection
const mongourl = process.env.DATABASE_URL;
mongoose.connect(mongourl,{useNewUrlParser:true,useUnifiedTopology:true})
.then((res)=>{
    console.log("mongodb connected");
})
const store = new mongodbSession({
    uri:mongourl,
    collection:"mySession"
})
app.use(
    session({
        secret:"key that will sign cookie",
        resave:false,
        saveUninitialized:false,
        store:store

    })
)




//router
const router = require('./routes/mcq.js');

app.use('/',router)







//connection to port
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

