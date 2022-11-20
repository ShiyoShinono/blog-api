const { sequelize } = require('./index')
const { DataTypes } = require("sequelize")

const menuModel = sequelize.define('menu', {
        menu_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        menu_path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0'
        }
    }, {
        timestamps: false
    })
    // 强制按照模型生成表
    // menuModel.sync({ alter: true })

module.exports = {
    menuModel
}