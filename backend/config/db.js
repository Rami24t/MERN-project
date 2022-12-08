const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`.brightMagenta);
        const connection = conn.connection;
        connection.on('connecting', () => {
            console.log('MongoDB connecting');
        });
        connection.on('error', (err) => {
            console.log(err);
        });
        connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        connection.on('connected', () => {
            console.log('MongoDB connected');
        });
        connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });
        connection.on('timeout', () => {
            console.log('MongoDB timeout');
        });
        connection.on('close', () => {
            console.log('MongoDB close');
        });
        connection.on('open', () => {
            console.log('MongoDB open');
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;