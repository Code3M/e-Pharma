const asyncHandler = (resqustHandler) => {
    (req,res,next) =>{
        Promise.resolve(resqustHandler(req,res,next)).catch((error)=>next(error))
    }
}

export {asyncHandler}