const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const marketRoutes = require('./routes/market.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/market', marketRoutes);

app.use((err, req, res, next) => {
    console.error(`[Error]: ${err.message}`);
    res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/market-pulse';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Database connected successfully.');
        app.listen(PORT, () => {
            console.log(`Enterprise server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err.message);
    });
