const {
    sequelize
} = require('./index')
const {
    DataTypes
} = require("sequelize");
const { userModel } = require('./userModel')
const articleModel = sequelize.define('article', {
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
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'http://127.0.0.1:3001/uploads/cover.jpg'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        tag: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('tag'))
            },
            set: function(val) {
                return this.setDataValue('tag', val)
            },
            allowNull: false
        },
        read: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        secret: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "0"
        },
        createdTime: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        updatedTime: {
            type: DataTypes.BIGINT,
        }
    }, {
        timestamps: false
    })
    // 强制按照模型生成表
    // articleModel.sync({ alter: true })

module.exports = {
    articleModel
}