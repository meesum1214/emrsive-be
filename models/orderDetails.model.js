module.exports = (sequelize, DataTypes) => {
    const OrderDetails = sequelize.define('Order_Details', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING(255),
            as: 'status'
        },
        description: {
            type: DataTypes.STRING(),
            as: 'description'
        }
    });
    return OrderDetails;
}