const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/StudentDatabase', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>{
    console.log("Connected...");
})
.catch((err)=>{
    console.log("not connect...");
})
