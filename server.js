const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("this is on port ")
})

app.listen(5000,()=>{
    console.log("listein on port");
});