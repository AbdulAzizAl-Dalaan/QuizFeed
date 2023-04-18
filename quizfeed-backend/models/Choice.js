const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class Choice extends Model {
}

Choice.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Represents what order the choices appear
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    variant: {
        type: DataTypes.STRING,
        allowNull: true
    },
    points: {
        // only a string because since sqlite does not support arrays
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Choice'
});

module.exports = Choice;