const express = require("express")
const userController = require("../controllers/user.controller")
const validateBody = require("../middleware/validate.middleware")
const userRouter = express.Router()
const orderService = require("../services/order.service")



userRouter
    .get("/", userController.getAllUsers)
    .get("/:id", userController.getUserById)

    //Get User order
    .get("/:id/orders", async(req, res, next) => {
        try {
            const { id } = req.params
            const orders = await orderService.getAllOrders()
            const userOrders = orders.filter(o => o.userId === parseInt(id))

            res.status(200).json({
                success: true,
                count: userOrders.length,
                data: userOrders
            })
            
        } catch (err) {
            next(err)    
        }
    })
    
    .post("/", validateBody, userController.createUser)
    .patch("/:id", validateBody, userController.updateUser)
    .delete("/:id", userController.deleteUser)



module.exports = userRouter