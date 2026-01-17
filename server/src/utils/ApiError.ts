class ApiError extends Error {
    statusCode: number;
    constructor(statusCode:number, message:string) {
        super(message)
        this.statusCode = statusCode
    }
}

const errorHandler = (res:Request, message:string, statusCode:number = 500, error:object = {}) => {
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