const express = require("express")
const productRouter = require("./routes/product.routes")
const logger = require("./middleware/logger.middleware")
const errorHandler = require("./middleware/error.middleware")
const userRouter = require("./routes/user.routes")
const orderRouter = require("./routes/order.routes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger)

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ShopFlow API is running"
    })
})

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)


//404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.url} not found`
    })
})

//Global error handler - must be added at the bottom
app.use(errorHandler)

module.exports = app

//Three ways through which request comes to the server, via params, queries, body ;;;; req.params, req.query, req.body