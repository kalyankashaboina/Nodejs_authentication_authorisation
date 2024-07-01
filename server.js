const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
const {authUser}=require("./Authorization/basicAuth")


app.use(express.json())
app.use(cors())

MONGO_URL="mongodb+srv://kalyan:abcd1234@cluster0.uum0wi0.mongodb.net/sample"

MONGO_URL1="mongodb://localhost:27017/  "
mongoose.connect(MONGO_URL1)
.then(()=>{console.log("database conneted")})
.catch((err)=>{console.log("error",err)})


let Employees=new mongoose.Schema({
    username:{type:"String",
        required:"true"
    },
    password:{
        type:"String"
        ,required:true
    }
})

const users=mongoose.model("users",Employees)




app.post("/register",async(req,res)=>{
    const{username,password}=req.body
try{
// let existing=await Employees.findOne({username})
// if(existing){
//     res.json({message:"user already exist"})
// }
// else{

let newuser=new users({
    username,password
})
await newuser.save()

res.status(201).json({message:"user creted sucessfully"})


// }



}
catch(err){
    console.log("error",err)
res.status(500).json({message:"failed to register"})}


})



app.get("/get/:id",async(req,res)=>{
const{username,password}=req.body
    try{

        const finder=await users.findByIdAndDelete(req.params.id)
        
        if(!finder){
            res.json(message,"user not found")
        }else{
            res.status(201).json(finder)

        }
    }
    catch(err){console.log("error",err)
        res.status(500).json({message:"not able to find"})
    }
})































app.listen(3006,()=>{console.log("port running in 3006")})













