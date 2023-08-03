module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define('Reviews', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        review: {
            type: DataTypes.STRING(550)
        }
    });
    return Reviews;
}