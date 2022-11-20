const { sequelize } = require('./index')
const { DataTypes } = require("sequelize");

const userModel = sequelize.define('user', {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_pwd: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        user_valid: {
            type: DataTypes.STRING
        },
        user_validExp: {
            type: DataTypes.STRING
        },
        createdTime: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    // 强制按照模型生成表
    // userModel.sync({ alter: true })

module.exports = {
    userModel
}