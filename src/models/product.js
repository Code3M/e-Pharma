import mongoose,{Schema} from "mongoose";

const productSchema = Schema({
    productName: {
        type:String,
        required:true
    },
    productSerialNumber:{
        type:String,
        unique: true
    },
    price:{
        type:Number,
        required:true
    },
    manufacturingDate:{
        type:Date, 
        required:true
    },
    productExpiry:{
        type:Date,
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
    },
    image:{
        imageUrl: {
            type: String,
            required: true 
          },
          imagePublicId: {
            type: String,
            required: true 
          }
    }
    

},{timestamps : true})
productSchema.pre('save', async function(next) {
    const Product = this.constructor;
    const count = await Product.countDocuments()
    this.productSerialNumber =  `SN00${count + 1}`;
    next();
});
export const Product = mongoose.model("Product",productSchema)