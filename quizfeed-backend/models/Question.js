const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class Question extends Model {
}

Question.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    randomizeChoices: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    variant: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Question'
});

module.exports = Question;