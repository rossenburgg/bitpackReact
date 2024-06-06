const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const moment = require('moment');

const router = express.Router();

// Place a new order
router.post('/order', auth, async (req, res) => {
    const { type, currencyPair, price, amount } = req.body;

    try {
        const order = Order.build({
            userId: req.user.id,
            type,
            currencyPair,
            price,
            amount,
        });

        await order.save();
        res.json(order);

        // Emit the new order to all connected clients
        req.io.emit('newOrder', order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get open orders
router.get('/orders', auth, async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { userId: req.user.id, status: 'open' } });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Execute a trade
router.post('/trade', auth, async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findByPk(orderId);
        if (order.status !== 'open') {
            return res.status(400).json({ msg: 'Order already executed or canceled' });
        }

        // Update order status
        order.status = 'executed';
        await order.save();

        // Emit the executed order to all connected clients
        req.io.emit('orderExecuted', order);

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
