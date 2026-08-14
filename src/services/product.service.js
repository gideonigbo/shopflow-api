// Temporary in-memory store
// This is an array acting as our "database" for now
// In Session 11 we replace this with real MongoDB queries
// The rest of the architecture stays exactly the same
let products = [
    { id: 1, name: "Nike Air Max", price: 45000, category: "Body", inStock: true },
    { id: 2, name: "Laptop", price: 350000, category: "Computers", inStock: true },
    { id: 3, name: "Nivea Lotion", price: 3500, category: "Body", inStock: false }
]


let nextId = 4


//Get all products
const getAllProducts = async (query) => {
    let result = [...products]

    //Search by name
    if (query.search) {
        result = result.filter(p => p.name.toLowerCase() === query.search.toLowerCase())
    }

    //Filter by category
    if (query.category) {
        result = result.filter(p => p.category.toLowerCase() === query.category.toLowerCase())
    }

    //Filter by Instock
    if (query.inStock !== undefined) {
        const inStock = query.inStock === "true" //query params are always strings
        result = result.filter(p => p.inStock === inStock)
    }

    //Sorting
    if (query.sort === "price_asc") {
        result.sort((a,b) => a.price - b.price)
    }
    if (query.sort === "price_desc") {
        result.sort((a,b) => b.price - a.price)
    }

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

//Get a product by ID
const getProductById = async (id) => {
    const product = products.find(p => p.id === parseInt(id))

    if (!product) {
        const err = new Error(`Product with id:${id} not found`)
        err.statusCode = 404
        throw err
    }

    return product
}

//Create a product
const createProduct = async (data) => {
    const { name, price, category } = data

    if (!name || !price || !category) {
        const err = new Error("Name, price and category are required")
        err.statusCode = 400
        throw err
    }

    const newProduct = {
        id: nextId++,
        name,
        price,
        category,
        inStock: data.inStock ?? true
    }

    products.push(newProduct)
    return newProduct
}

//Update product
const updateProduct = async (id, data) => {
    const index = products.findIndex(p => p.id === parseInt(id))

    if (index === -1) {
        const err = new Error(`Product with id ${id} not found`)
        err.statusCode = 404
        throw err
    }

    products[index] = { ...products[index], ...data }
    return products[index]
}

//Delete a product
const deleteProduct = async (id) => {
    const index = products.findIndex(p => p.id === parseInt(id))

    if (index === -1) {
        const err = new Error(`Product with id ${id} not found`)
        err.statusCode = 404
        throw err
    }

    const deleted = products.splice(index, 1)
    return deleted[0]
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}