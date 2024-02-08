import { User } from "../models/user.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Product } from "../models/product.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary,replaceOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



//List new Product
const addingProduct = asyncHandler(async(req,res) =>{
    const user = await User.findOne(req.user._id)
    if(user.role !== "Seller") throw new ApiError(400,"Buyer can't sell")

    const {productName,price,productExpiry,manufacturingDate,category,description,isPrescriptionRequired,numberOfStocks,image} = req.body
    if ([productName,price,productExpiry,manufacturingDate,category,description,isPrescriptionRequired,numberOfStocks,image].some((field) => typeof field === 'string' && field.trim() === '')) {
        throw new ApiError(400, "All fields are Required");
    }
    const productImagePath = req.files?.image[0]?.path
    if(!productImagePath) throw new ApiError(400,"Image requied")

    const imageRes =await uploadOnCloudinary(productImagePath)

    const product = await Product.create({
        productName,
        price,
        productExpiry,
        manufacturingDate,
        category,
        description,
        isPrescriptionRequired,
        ownerId:user._id,
        numberOfStocks,
        image : {imageUrl:imageRes.url,imagePublicId:imageRes.public_id}

    })
    if(!product) throw new ApiError(500, "Something went wrong")

    return res.status(201).json(new ApiResponse(200,product,"Product Listed successfully"))
})

//Edit product details
/**
 * Owner only can edit the product
 * Product verification - Id
 */
const editProduct = asyncHandler(async(req,res)=>{
    const productSerialNumber = req.params.id
    const product = await Product.findOne({productSerialNumber})

    if(!product) throw new ApiError(400,"Product not Present")
    
    if(req.user._id.toString() !== product.ownerId.toString()) {throw new ApiError(400,"Product owner only can change details")}
    //const {productName,price,productExpiry,manufacturingDate,category,description,isPrescriptionRequired,numberOfStocks} = req.body
    const fields =['productName','price','productExpiry','manufacturingDate','category','description','isPrescriptionRequired','numberOfStocks']
    const filter = {productSerialNumber}
    const update = {$set:{}}
    fields.forEach((field) => {
        if(req.body[field])
            update.$set[field] = req.body[field]
    })

   
    // image edit setUp
    if(req.files?.image[0]?.path)
    {
        const image = req.files?.image[0]?.path
        //console.log(product.image.imagePublicId);
        //console.log(image);
        const imageUrl = await replaceOnCloudinary(image,product.image.imagePublicId)
        console.log(imageUrl);
        update.$set[image.imageUrl] = imageUrl.url
        update.$set[image.imagePublicId] = imageUrl.public_id

    }
    try {
        const updatedProduct = await Product.findOneAndUpdate(filter,update,{new:true})
        res.status(200).json(new ApiResponse(200,updatedProduct,"Details Updated"))
    } catch (error) {
        throw new ApiError(500,"Server Error")
    }

})


// get single product
const findProduct = asyncHandler(async(req,res)=>{
    const productSerialNumber = req.params.id
    const product = await Product.findOne({productSerialNumber})
    if(!product) throw new ApiError(404,"Product Not Found")

    res.status(200).json(new ApiResponse(200,product,"Product Found"))

})
// get All product
const findAllProduct = asyncHandler(async(req,res)=>{
    //const {productSerialNumber} = req.params.id
    const product = await Product.find()
    if(!product) throw new ApiError(404,"Products Not Present")

    res.status(200).json(new ApiResponse(200,product,"Product Found"))

})

//remove product
const removeProduct = asyncHandler(async(req,res)=>{
    const productSerialNumber = req.params.id
    const product = await Product.findOneAndDelete({productSerialNumber})
    if(!product) throw new ApiError(404,"Product Not Found")

    res.status(200).json(new ApiResponse(200,product,"Product Deleted"))
})

export {addingProduct,editProduct,
    findProduct,
    findAllProduct,
    removeProduct
}