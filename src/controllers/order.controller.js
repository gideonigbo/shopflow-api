const orderService = require("../services/order.service")
const asyncHandler = require("../utils/asyncHandler")



//Get all orders
const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await orderService.getAllOrders()
    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    })
})


//Get single order
const getOrderById = asyncHandler(async(req, res, next) => {
    const order = await orderService.getOrderById(req.params.id)
    res.status(200).json({
        success: true,
        data: order
    })
})


//Create order
const createOrder = asyncHandler(async (req, res, next) => {
    const newOrder = await orderService.createOrder(req.body)
    res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: newOrder
    })
})

//Update order
const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const updatedOrder = await orderService.updateOrderStatus(req.params.id, req.body)
    res.status(200).json({
        success: true,
        message: "Order updated successfully",
        data: updatedOrder
    })
})


//Delete Order
const cancelOrder = asyncHandler(async (req, res, next) => {
    const deleteOrder = await orderService.cancelOrder(req.params.id)
    res.status(200).json({
        success: true,
        message: `Order cancelled successfully`
    })
})




module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder
}
