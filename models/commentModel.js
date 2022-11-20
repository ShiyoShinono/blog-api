const { sequelize } = require('./index')
const { DataTypes } = require("sequelize")
const { userModel } = require('./userModel')
const { articleModel } = require('./articleModel')
const commentModel = sequelize.define('comment', {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
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
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: articleModel,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        createdTime: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    // 强制按照模型生成表
    // commentModel.sync({ alter: true })

module.exports = {
    commentModel
}