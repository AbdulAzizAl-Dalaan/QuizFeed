class Tag extends Model {
}

Tag.init({
    text: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Tag',
    timestamps: false
});

module.exports = Tag;