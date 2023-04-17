const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class Quiz extends Model {
    // returns approval rating percentage in range [0,1]
    // returns null if there are no votes
    approval()
    {
        // shortcircuiting: if both upvotes and downvotes are null return null, otherwise return computation
        return (this.upvotes || this.downvotes) && this.upvotes / (this.upvotes + this.downvotes);
    }
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
    upvotes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    downvotes: {
        type: DataTypes.INTEGER,
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
    modelName: 'Question',
    timestamps: false
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
    modelName: 'Choice',
    timestamps: false
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
    }
}, {
    sequelize,
    modelName: 'Result',
    timestamps: false
});

Quiz.hasMany(Question, { as: 'questions', onDelete: 'cascade', onUpdate: 'cascade' });
Question.belongsTo(Quiz);
Question.hasMany(Choice, { as: 'choices', onDelete: 'cascade', onUpdate: 'cascade' });
Choice.belongsTo(Question);

Quiz.hasMany(Result, { as: 'results', onDelete: 'cascade', onUpdate: 'cascade' });
Result.belongsTo(Quiz);

module.exports = { Quiz, Question, Choice, Result };