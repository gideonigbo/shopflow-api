const { NotFoundError, ValidationError } = require("../utils/AppError")

const createdDate = new Date().toISOString()

let orders = [
    {id: 1, userId: 1, products: ["Gucci shoes", "Plain Tees"], totalAmount: 100000, status: "completed", createdAt: createdDate},
    {id: 2, userId: 1, products: ["Mac Charger"], totalAmount: 4000, status: "pending", createdAt: createdDate},
    {id: 3, userId: 3011, products: ["School bag", "Coloured socks"], totalAmount: 20000, status: "completed", createdAt: createdDate}
]

let nextId = 4

const getAllOrders = async () => {
    return orders
}


const getOrderById = async (id) => {
    const order = orders.find(p => p.id === parseInt(id))

    if (!order) {
        throw new NotFoundError(`Order with Id: ${id}`)
    }

    return order
}


const createOrder = async(data) => {
    const { userId, products, totalAmount, status} = data
    if(!userId || !products || !totalAmount) {
        throw new ValidationError("user ID, products, total Amount are required")
    }

    const newOrder = {
        id: nextId++,
        userId,
        products,
        totalAmount,
        status: status || "pending",
        createdAt: new Date().toISOString()
    }

    orders.push(newOrder)
    return newOrder
}


const updateOrderStatus = async(id, data) => {
    const index = orders.findIndex(p => p.id === parseInt(id))

    if(index === -1) {
        throw new NotFoundError(`Order with Id: ${id}`)
    }

    orders[index] = {...orders[index], ...data}
    return orders[index]
}


//Cancel an order
const cancelOrder = async (id) => {
    const index = orders.findIndex(p => p.id === parseInt(id))

    if(index === -1) {
        throw new NotFoundError(`Order with Id: ${id}`)
    }

    const canceled = orders.splice(index, 1)
    return canceled[0]
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder
}