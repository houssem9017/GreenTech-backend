import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import cookieParser from "cookie-parser";
import morgan from 'morgan';

const app = express();
dotenv.config();

if (!process.env.MONGO) {
    console.error("MONGO environment variable not set.");
    process.exit(1);
}

if (!process.env.PORT) {
    console.error("PORT environment variable not set.");
    process.exit(1);
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Including the routes
app.use(morgan('dev'));
app.use('/user', userRoutes);
app.use('/package', packageRoutes);

// Test url
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
