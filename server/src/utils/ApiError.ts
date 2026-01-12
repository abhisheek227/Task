class ApiError extends Error {
    constructor(statusCode:number, message:string) {
        super(message)
        this.statusCode = statusCode
    }
}

const errorHandler = (res, message:string, statusCode = 500, error = {}) => {
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