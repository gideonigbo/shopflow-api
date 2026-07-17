const validateBody = (req, res, next) => {
    if (req.method === "POST" || req.method === "PATCH") {
        if (!req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false,
                message: "Request body can not be empty"
            })
        }
    }
    next()
}

module.exports = validateBody