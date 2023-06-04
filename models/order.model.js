module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderDetails: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            as: 'order_details'
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            as: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            as: 'last_name'
        },
        companyName: {
            type: DataTypes.STRING(255),
            as: 'company_name'
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        appartment: {
            type: DataTypes.STRING(255),
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING(255),
            allowNull: false,
            as: 'zip_code'
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        additionalInfo: {
            type: DataTypes.STRING(255),
            allowNull: false,
            as: 'additional_info'
        },
        paymentDetails: {
            type: DataTypes.STRING(500),
            allowNull: false,
            as: 'payment_details'
        },
        orderStatus: {
            type: DataTypes.STRING(255),
            allowNull: false,
            as: 'order_status'
        },
    });
    return Order;
}