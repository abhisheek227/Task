class ApiError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}
const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.error || null,
    });
};

export default errorHandler;

export { ApiError,errorHandler };