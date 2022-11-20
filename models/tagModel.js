const { sequelize } = require('./index')
const { DataTypes } = require("sequelize")

const tagModel = sequelize.define('tag', {
        tag_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        searchNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        timestamps: false
    })
    // 强制按照模型生成表
    // tagModel.sync({ alter: true })

module.exports = {
    tagModel
}