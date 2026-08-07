const orderService = require("../services/order.service")


//Get all orders
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders()
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        })
        
    } catch (err) {
        next(err)
    }
}


//Get single order
const getOrderById = async(req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id)
        res.status(200).json({
            success: true,
            data: order
        })
        
    } catch (err) {
        next(err)
    }
}


//Create order
const createOrder = async (req, res, next) => {
    try {
        const newOrder = await orderService.createOrder(req.body)
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: newOrder
        })
        
    } catch (err) {
        next(err)
    }
}

//Update order
const updateOrderStatus = async (req, res, next) => {
    try {
        const updatedOrder = await orderService.updateOrderStatus(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: updatedOrder
        })
        
    } catch (err) {
        next(err)
    }
}

//Delete Order
const cancelOrder = async (req, res, next) => {
    try {
        const deleteOrder = await orderService.cancelOrder(req.params.id)
        res.status(200).json({
            success: true,
            message: `Order cancelled successfully`
        })
        
    } catch (err) {
        next(err)
    }
}




module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder
}
