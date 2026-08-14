// Temporary in-memory store
// This is an array acting as our "database" for now
// In Session 11 we replace this with real MongoDB queries
// The rest of the architecture stays exactly the same

const createdDate = new Date().toISOString()

let users = [
    { id: 1, name: "Gideon Igbo", email: "gideon@shopflow.com", role: "seller", createdAt: createdDate },
    { id: 2, name: "Chidinman Esiaba", email: "favour@shopflow.com", role: "customer", createdAt: createdDate }
]


let nextId = 3

//Get all users
const getAllUsers = async (query) => {
    let result = [...users]

    //Filter by role
    if (query.role)
        result = result.filter(p => p.role.toLowerCase() === query.role.toLowerCase())

    //Pagination
    const page = parseInt(query.page)  || 1
    const limit = parseInt(query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const total = result.length
    result = result.slice(startIndex, endIndex)

    return {
        total,
        page,
        limit,
        count: result.length,
        data: result
    }
}

//Get a user with ID
const getUserById = async(id) => {
    const user = users.find(p => p.id === parseInt(id))

    if (!user) {
        const err = new Error(`User with Id: ${id} not found`)
        err.statusCode = 404
        throw err
    }
    return user
}


//Create a user
const createUser = async(data) => {
    const { name, email, role } = data

    if(!name || !email) {
        const err = new Error(`Name and email are required`)
        err.statusCode = 400
        throw err
    }

    const newUser = {
        id: nextId++,
        name,
        email,
        role: role || "customer",
        createdAt: new Date().toISOString()
    }

    users.push(newUser)
    return newUser
}


//Update a user
const updateUser = async(id, data) => {
    const index = users.findIndex(p => p.id === parseInt(id))

    if (index === -1){
        const err = new Error(`User with Id ${id} not found.`)
        err.statusCode = 404
        throw err
    }

    users[index] = {...users[index], ...data}
    return users[index]
}


//Delete a user
const deleteUser = async (id) => {
    const index = users.findIndex(p => p.id === parseInt(id))

    if (index === -1){
        const err = new Error(`User with Id ${id} not found.`)
        err.statusCode = 404
        throw err
    }

    const deleted = users.splice(index, 1)
    return deleted[0]
}




module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}