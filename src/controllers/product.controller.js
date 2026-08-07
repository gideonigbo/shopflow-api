const productService = require("../services/product.service")

const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts(req.query)
        res.status(200).json({
            success: true,
            ...products
        })
        
    } catch (err) {
        next(err)
    }
}



const getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id)
        res.status(200).json({
            success: true,
            data: product
        })
        
    } catch (err) {
        next(err)
    }
}


const createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body)
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        })
    } catch (err) {
        next(err)
    }
}


const updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        })
    } catch (err) {
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.id)
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}