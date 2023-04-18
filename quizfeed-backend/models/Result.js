const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class Result extends Model {
}

Result.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Represents what element of the points array in Choice this result should correspond to (range: 0 - length of Choice.points - 1)
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    receivedNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'Result'
});

module.exports = Result;