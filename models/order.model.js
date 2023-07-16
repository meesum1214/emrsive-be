module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderPrice: {
            type: DataTypes.STRING(255),
            as: 'order_price'
        },
        email: {
            type: DataTypes.STRING(255),
        },
        firstName: {
            type: DataTypes.STRING(255),
            as: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING(255),
            as: 'last_name'
        },
        companyName: {
            type: DataTypes.STRING(255),
            as: 'company_name'
        },
        country: {
            type: DataTypes.STRING(255),
        },
        address: {
            type: DataTypes.STRING(255),
        },
        appartment: {
            type: DataTypes.STRING(255),
        },
        city: {
            type: DataTypes.STRING(255),
        },
        state: {
            type: DataTypes.STRING(255),
        },
        zipCode: {
            type: DataTypes.STRING(255),
            as: 'zip_code'
        },
        phone: {
            type: DataTypes.STRING(255),
        },
        additionalInfo: {
            type: DataTypes.STRING(255),
            as: 'additional_info'
        },
        paymentDetails: {
            type: DataTypes.STRING(500),
            as: 'payment_details'
        },
        orderStatus: {
            type: DataTypes.STRING(255),
            as: 'order_status'
        },
    });
    return Order;
}