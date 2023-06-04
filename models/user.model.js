module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            as: 'first_name',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            as: 'last_name',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            as: 'email',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            as: 'password',
        },
    });
    return User;
}