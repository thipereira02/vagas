const errorMiddleware = (
    error,
    req,
    res,
    next
) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Internal server error";
    return res.status(statusCode).send(message);
};

module.exports = errorMiddleware;