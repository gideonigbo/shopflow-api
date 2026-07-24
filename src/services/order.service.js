//

const createdDate = new Date().toISOString()

let orders = [
    {id: 1, userId: 2345, products: ["Gucci shoes", "Plain Tees"], totalAmount: 100000, status: "completed", createdAt: createdDate},
    {id: 2, userId: 2805, products: ["Mac Charger"], totalAmount: 4000, status: "pending", createdAt: createdDate},
    {id: 3, userId: 3011, products: ["School bag", "Coloured socks"], totalAmount: 20000, status: "completed", createdAt: createdDate}
]

let nextId = 4

const getAllOrders = async () => {
    return orders
}


const getOrderById = async (id) => {
    const order = orders.find(p => p.id === parseInt(id))

    if (!order) {
        const err = new Error(`Order with id: ${id} not found`)
        err.statusCode = 404
        throw err
    }

    return order
}


const createOrder = async(data) => {
    const { userId, products, totalAmount, status} = data
    if(!userId || !products || !totalAmount) {
        const err = new Error("userId, products, totalAmount can not be empty")
        err.statusCode = 400
        throw err
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
        const err = new Error(`Order with ID: ${id} can not be found`)
        err.statusCode = 404
        throw err
    }

    orders[index] = {...orders[index], ...data}
    return orders[index]
}


//Cancel an order
const cancelOrder = async (id) => {
    const index = orders.findIndex(p => p.id === parseInt(id))

    if(index === -1) {
        const err = new Error(`Order with ID: ${id} can not be found`)
        err.statusCode = 404
        throw err
    }

    const canceled = orders.splice(index, 1)
    return canceled
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder
}