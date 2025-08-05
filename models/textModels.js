const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Text = sequelize.define('Text', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'text',
    timestamps: false
});

module.exports = Text;