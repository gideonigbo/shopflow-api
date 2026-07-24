const express = require("express")
const orderRouter = express.Router()
const orderController = require("../controllers/order.controller")
const validateBody = require("../middleware/validate.middleware")


orderRouter
    .get("/", orderController.getAllOrders)
    .get("/:id", orderController.getOrderById)
    .post("/", validateBody, orderController.createOrder)
    .patch("/:id", validateBody, orderController.updateOrderStatus)
    .delete("/:id", orderController.cancelOrder)



module.exports = orderRouter