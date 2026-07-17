const dotenv = require("dotenv")
dotenv.config()

const app = require("./app")

const PORT = process.env.PORT || 5000


const server = app.listen(PORT, () => {
    console.log(`ShopFlow API running in ${process.env.NODE_ENV} mode on port ${PORT} : http://localhost:${PORT} `)
})

process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`)
    server.close(() => process.exit(1))
})