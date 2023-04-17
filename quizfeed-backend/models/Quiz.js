const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class Quiz extends Model {
}

Quiz.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creatorUsername: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    takenNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    approval: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NULL
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NULL
    }
}, {
    sequelize,
    modelName: 'Quiz'
});

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
    variant: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Question'
});

class Choice extends Model {
}

Choice.init({
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
    variant: {
        type: DataTypes.STRING,
        allowNull: false
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

class Result extends Model {
}

Result.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
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

Quiz.hasMany(Question, { as: 'questions' });
Question.belongsTo(Quiz);
Question.hasMany(Choice, { as: 'choices' });
Choice.belongsTo(Question);

Quiz.hasMany(Result, { as: 'results' });
Result.belongsTo(Quiz);

module.exports = { Quiz, Question, Choice, Result };