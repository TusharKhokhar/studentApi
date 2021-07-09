const mongoose = require('mongoose');
const validator= require('validator')

const studentSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true, "Email is already in use..."],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:[true,"Number is alredy used..."],
        min:10,
        // max:10
    },
    address:{
        type:String,
    }
})


const Student = new mongoose.model("Student",studentSchema)

module.exports=Student