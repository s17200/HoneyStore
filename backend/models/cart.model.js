let mongoose=require("mongoose");

let cartschema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    userID:{
        type:String
    }
})

let Cartmodel=mongoose.model("cart",cartschema);

module.exports={
    Cartmodel
}