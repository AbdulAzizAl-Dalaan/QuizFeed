const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class History extends Model {
}

History.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'History'
});

module.exports = History;