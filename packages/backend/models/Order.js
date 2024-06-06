const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('BitPack', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currencyPair: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'open',
    },
});

module.exports = Order;
