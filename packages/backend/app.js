const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const authRoute = require('./routes/auth');
const protectedRoute = require('./routes/protected');
const auth = require('./middleware/auth');
const walletRoute = require('./routes/wallet');
const tradingRoute = require('./routes/trading');

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    req.io = io;
    next();
});
// Database connection
const sequelize = new Sequelize('BitPack', 'postgres', 'Rossenburg909090@@@', {
    host: 'localhost',
    dialect: 'postgres',
});

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/protected', auth, protectedRoute);
app.use('/api/wallet', walletRoute);
app.use('/api/trading', tradingRoute);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
