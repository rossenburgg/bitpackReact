const express = require('express');
const Wallet = require('../models/Wallet');
const auth = require('../middleware/auth');

const router = express.Router();

// Get wallet balances
router.get('/', auth, async (req, res) => {
    try {
        const wallets = await Wallet.findAll({ where: { userId: req.user.id } });
        res.json(wallets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Deposit funds
router.post('/deposit', auth, async (req, res) => {
    const { currency, amount } = req.body;

    try {
        let wallet = await Wallet.findOne({ where: { userId: req.user.id, currency } });
        if (!wallet) {
            wallet = Wallet.build({ userId: req.user.id, currency, balance: amount });
        } else {
            wallet.balance += amount;
        }
        await wallet.save();
        res.json(wallet);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Withdraw funds
router.post('/withdraw', auth, async (req, res) => {
    const { currency, amount } = req.body;

    try {
        let wallet = await Wallet.findOne({ where: { userId: req.user.id, currency } });
        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ msg: 'Insufficient funds' });
        }
        wallet.balance -= amount;
        await wallet.save();
        res.json(wallet);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
