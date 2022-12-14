const errorHandler = (err,req,res,next) => {
    console.log(err.message.yellow);
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json(
        { message: 'Server Error: '+err.message,
          stack: process.env.NODE_ENV === 'production' ? null : err.stack
        }
        );
}

module.exports = {errorHandler};