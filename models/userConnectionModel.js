const { sequelize } = require('./index')
const { DataTypes } = require("sequelize")
const { userModel } = require('./userModel')
const { articleModel } = require('./articleModel')
const userConnectionModel = sequelize.define('userConnection', {
        up_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: userModel,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        fans_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: userModel,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }, {
        timestamps: false
    })
    // 强制按照模型生成表
    // userConnectionModel.sync({ alter: true })

module.exports = {
    userConnectionModel
}