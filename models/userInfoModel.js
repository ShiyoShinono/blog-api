const { sequelize } = require('./index')
const { DataTypes } = require("sequelize");
const { userModel } = require('./userModel')
const userInfoModel = sequelize.define('userInfo', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: userModel,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '1'
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        personalIntroduction: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        img: {
            type: DataTypes.STRING,
            defaultValue: 'http://127.0.0.1:3001/uploads/avatar.jpg'
        }
    }, {
        timestamps: false
    })
    // 强制按照模型生成表
    // userInfoModel.sync({ alter: true })

module.exports = {
    userInfoModel
}