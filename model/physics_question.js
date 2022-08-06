const mongoose = require('mongoose');
const question_schema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        unique:true
    },
    op1:{
        type:String,
        required:true,
    },
    op2:{
        type:String,
        required:true,
    },
    op3:{
        type:String,
        required:true,
    },
    op4:{
        type:String,
        required:true,
    },
    ans:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("physics_question",question_schema);