import mongoose,{Schema} from "mongoose";

const userSchema = Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:['Male','Female','Others'],
        default:null,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:['Seller','Buyer'],
        default:'Buyer'
    },
    gstNo:{
        type:String
    },
    address:{
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        pin:{
            type:Number,
            required:true
        },
        fullAddress:{
            type:String
        }
    },
    orderHistory:{
        type:Schema.Types.ObjectId,
        ref:""
    },

},
{timestamps: true})

export const User = mongoose.model("User",userSchema)