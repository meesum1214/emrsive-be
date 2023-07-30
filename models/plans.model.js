module.exports = (sequelize, DataTypes) => {
    const Plan = sequelize.define('Plan', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: DataTypes.STRING(1000),
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });
    return Plan;
}