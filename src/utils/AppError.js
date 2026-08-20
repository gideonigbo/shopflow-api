class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.name = this.constructor.name
        //this.constructor.name gives the class name = AppError, "NotFoundError"

        Error.captureStackTrace(this, this.constructor)
    }
}

class NotFoundError extends AppError {
    constructor(resource) {
        super(`${resource} not found`, 404)
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400)
    }
}

class UnauthorizedError extends AppError {
    constructor(message = "Not authorised") {
        super(message, 401)
    }
}

class ForbiddenError extends AppError {
    constructor(message = "You do not have permission to perform this action") {
        super(message, 403)
    }
}

class ConflictError extends AppError {
    constructor(message) {
        super(message, 409)
    }
}

module.exports = {
    AppError,
    NotFoundError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError,
    ConflictError
}