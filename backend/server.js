const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const donorRoutes = require('./routes/donors');
const bloodStockRoutes = require('./routes/bloodStock');
const requestRoutes = require('./routes/requests');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());


// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    }).catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });


//Routes
app.use('/api/donors', donorRoutes);
app.use('/api/bloodStock', bloodStockRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler)


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

