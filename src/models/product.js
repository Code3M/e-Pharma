import mongoose,{Schema} from "mongoose";

const productSchema = Schema({
    productName: {
        type:String,
        required:true
    },
    productId:{

    },
    price:{
        type:Number,
        required:true
    },
    productExpiry:{
        type:String,
        required:true
    },
    manufacturingDate:{
        type:String, //need to change to date type
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    isPrescriptionRequired:{
        type:Boolean
    },
    ownerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    numberOfStocks:{
        type:Number
    }

},{timestamps : true})

export const Product = mongoose.model("Product",productSchema)