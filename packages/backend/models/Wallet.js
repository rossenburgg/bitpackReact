const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('BitPack', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

const Wallet = sequelize.define('Wallet', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
});

module.exports = Wallet;
