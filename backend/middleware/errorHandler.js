// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Internal Server Error';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ID : ${err.value}`;
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorHandler;
