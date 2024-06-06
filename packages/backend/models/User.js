const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('BitPack', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;
