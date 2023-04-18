const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');
const { Quiz, Result } = require('./Quiz');
const User = require('./User');

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

User.hasMany(History, { as: 'histories' });
History.belongsTo(User);
Quiz.hasMany(History, { as: 'histories' });
History.belongsTo(Quiz);
Result.hasMany(History, { as: 'histories' });
History.belongsTo(Result);

module.exports = History;