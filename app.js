const express=require('express')
const bodyParser=require('body-parser')
const Student=require('./model/student')

require('./db/connection')


const port=process.env.PORT || 80
const app=express()

// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("this is home page...")
})

// app.post('/student',(req,res)=>{
//     console.log(req.body);
//     const document=new Student(req.body)
    
//     document.save().then(()=>{
//         //201 for create data
//         res.status(201).send(document)
//     })
//     .catch((err)=>{
//         res.status(400).send(err)
//     })

// })

// async - await

app.post('/student',async(req,res)=>{
    try{
        const document=new Student(req.body)
        const result=await document.save()
        res.status(201).send(result)
    }catch(err){
        res.status(400).send(err) 
    }
})

app.get('/student',async(req,res)=>{
    try{
        // const query={name:"tushar"}
        //const query={name:req.query.name}
        const result=await Student.find({})
        // const result=await Student.find({}).select({name:1})

        res.send(result)
    }
    catch(err){
        res.send(err)
    }
    
})

app.get('/student/:id',async(req,res)=>{
    try{
        
        const _id=req.params.id
        
        const result=await Student.find({_id})
        res.send(result)
        
    }
    catch(err){
        res.send(err)
    }
    
})

app.put('/student',async(req,res)=>{
    try{
        const obj={name:"tushar"}
        const result=await Student.updateOne(obj,{$set:{name:"TUSHAR"}})
        res.send(result)
    }
    catch(err){
        res.send(err)
    }
})


// app.put('/student/:id',async(req,res)=>{
//     try{
//         const _id=req.params.id
//         const result=await Student.findByIdAndUpdate(_id,{$set:{name:"TUSHAR Khokhar"}},{new:true})
        
//         res.send(result)
//     }
//     catch(err){
//         res.send(err)
//     }
// })


app.put('/student/:phone',async(req,res)=>{
    try{
        // const Phone=parseInt(req.params.phone)
        const Phone=parseInt(req.params.phone)
        const result=await Student.updateOne({phone:Phone},req.body)
        // console.log(result)
        res.send(result)
    }
    catch(err){
        res.send(err)
    }
})

app.delete('/student/:id',async(req,res)=>{
    try{
        const _id=req.params.id
        const result=await Student.deleteOne({_id})
        if(!req.params.id){
           return  res.send("Something wrong...")
        }
        else{
            res.send("delete Successfully...")
        }
    }
    catch(err){
        console.log(err);
    }
    
})

app.use((req,res)=>{
    res.send("Page not found")
})

app.listen(port,()=>{
    console.log("server started...");
})