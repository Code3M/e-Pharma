import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    password:{
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


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
} 
userSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        mobile:this.mobile
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}



export const User = mongoose.model("User",userSchema)