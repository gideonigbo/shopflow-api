const express = require("express")
const userController = require("../controllers/user.controller")
const validateBody = require("../middleware/validate.middleware")
const userRouter = express.Router()



userRouter
    .get("/", userController.getAllUsers)
    .get("/:id", userController.getUserById)
    .post("/", validateBody, userController.createUser)
    .patch("/:id", validateBody, userController.updateUser)
    .delete("/:id", userController.deleteUser)



module.exports = userRouter