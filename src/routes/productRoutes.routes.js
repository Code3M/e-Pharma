import { Router } from "express";
import { addingProduct,editProduct,findProduct,
    removeProduct,
    findAllProduct } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/verifyJwt.js";
const productRouter = Router()

productRouter.route("/registerProduct").post(verifyJwt,
    upload.fields([
        {
          name: "image",
          maxCount: 1,
        },
      ])
    ,addingProduct)

productRouter.route("/editProduct/:id").put(
  verifyJwt,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  editProduct
)

productRouter.route("/find/:id").get(findProduct)
productRouter.route("/findAll").get(findAllProduct)
productRouter.route("/Delete/:id").delete(removeProduct)


export default productRouter