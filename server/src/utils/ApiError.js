class ApiError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}

const errorHandler = (res, message, statusCode = 500, error = {}) => {
    res.status(statusCode).json({
        success: false,
        message,
        error: {
            statusCode,
            message,
            error,
        },
    });
};

export { ApiError,errorHandler };