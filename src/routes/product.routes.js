const express = require("express")
const productRouter = express.Router()
const productController = require("../controllers/product.controller")
const validateBody = require("../middleware/validate.middleware")


productRouter
    .get("/", productController.getAllProducts)
    .get("/:id", productController.getProductById)
    .post("/", validateBody, productController.createProduct)
    .patch("/:id",validateBody, productController.updateProduct)
    .delete("/:id", productController.deleteProduct)


module.exports = productRouter