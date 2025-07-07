require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const linksRoutes = require('./src/routes/linksRoutes');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');  // Add payment routes

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: process.env.CLIENT_ENDPOINT,
    credentials: true
};
app.use(cors(corsOptions));

app.use('/auth', authRoutes);
app.use('/links', linksRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);  // Mount payment routes

const PORT = 5001;
app.listen(PORT, (error) => {
    if (error) {
        console.log('Error starting the server: ', error);
    } else {
        console.log(`Server is running at http://localhost:${PORT}`);
    }
});
