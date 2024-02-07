const asyncHandler = (resqustHandler) => {
    return (req,res,next) =>{
        Promise.resolve(resqustHandler(req,res,next)).catch((error)=>next(error))
    }
}

export default asyncHandler