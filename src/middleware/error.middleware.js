const errorHandler = (err, req, res, next) => {
    console.error(err.stack)

    let statusCode = err.statusCode || 500
    let message = err.message || "Internal Server Error"
    let errors = null

    if (err instanceof SyntaxError && err.status === 400 && "body in err") {
        statusCode = 400
        message = "Invalid JSON - check your request body"
    }

    //Handle errors that have no message - generic 500
    if (statusCode === 500 && process.env.NODE_ENV === "production") {
        message = "Something went wrong on our end"
    }


    res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors }),
        ...(process.env.NODE_ENV === "development" && { stack: err.stack})
    })
}

module.exports = errorHandler