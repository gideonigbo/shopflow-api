const productService = require("../services/product.service")
const asyncHandler = require("../utils/asyncHandler")




const getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await productService.getAllProducts(req.query)
    res.status(200).json({
        success: true,
        ...products
    })

})



const getProductById = asyncHandler(async (req, res, next) => {
    const product = await productService.getProductById(req.params.id)
    res.status(200).json({
        success: true,
        data: product
    })
        
})


const createProduct = asyncHandler(async (req, res, next) => {
    const product = await productService.createProduct(req.body)
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product
    })

})


const updateProduct = asyncHandler(async (req, res, next) => {
    const product = await productService.updateProduct(req.params.id, req.body)
    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product
    })

})

const deleteProduct = asyncHandler(async (req, res, next) => {
    await productService.deleteProduct(req.params.id)
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}