const userService = require("../services/user.service")
const asyncHandler = require("../utils/asyncHandler")


const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await userService.getAllUsers(req.query)
    res.status(200).json({
        success: true,
        ...users
    })
})


const getUserById = asyncHandler(async (req, res, next) => {
    const user = await userService.getUserById(req.params.id)
    res.status(200).json({
        success: true,
        data: user
    })       
})


const createUser = asyncHandler(async (req, res, next) => {
    const user = await userService.createUser(req.body)
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user
    })
})


const updateUser = asyncHandler(async (req, res, next) => {
    const user = await userService.updateUser(req.params.id, req.body)
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user
    })
})


const deleteUser = asyncHandler(async (req, res, next) => {
    await userService.deleteUser(req.params.id)
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})



module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}