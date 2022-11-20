const express = require('express')
const userConnection = express.Router()
const userConnectionController = require('../controllers/userConnectionController')
const {
  userModel
} = require('../models/userModel')
const {
  userInfoModel
} = require('../models/userInfoModel')
const {
  articleModel
} = require('../models/articleModel')
const {
  userConnectionModel
} = require('../models/userConnectionModel')
// 获取关注情况
userConnection.get('/userConnection/getConnection', async (req, res) => {
  let params = req.query
  let data = await userConnectionController.getConnection(params)
  if (data.length !== 0) {
    return res.sendResult('1', '✔已关注', {})
  } else {
    return res.sendResult('0', '+关注', {})
  }
})
// 更改关注情况
userConnection.post('/userConnection/editUserConnection', async (req, res) => {
  let params = req.body
  let hasConnection = await userConnectionModel.findAll({
    where: {
      up_id: params.up_id,
      fans_id: params.fans_id
    }
  })
  if (hasConnection.length !== 0) {
    await userConnectionController.deleteUserConnection(params)
  } else {
    await userConnectionController.addUserConnection(params)
  }
  return res.sendResult('0', '更新成功', {})
})
// userConnection.post('/userConnection/deleteUserConnection', async (req, res) => {
//   let params = req.body
//   await userConnectionController.deleteUserConnection(params)
//   return res.sendResult('0', '取消关注成功', {})
// })
userConnection.get('/userConnection/getUserConnection', async (req, res) => {
  let id = req.query.id
  let upInfo = await userConnectionController.getUserConnection(id)
  let up = []
  for (let item of upInfo) {
    up.push(item.up_id)
  }
  articleModel.belongsTo(userModel, {
    foreignKey: 'user_id',
    targetKey: 'id',
  })
  let upArticleInfo = await articleModel.findAll({
    where: {
      user_id: up,
      secret:'0'
    },
    include: [{
      attributes: ['user_name'],
      model: userModel
    }],
    order: [
      ['createdTime', 'DESC']
    ]
  })
  return res.sendResult('0', '获取成功', upArticleInfo)
})
// 获取关注列表
userConnection.get('/userConnection/getConnectionList', async (req, res) => {
  let id = req.query.id
  console.log(req.query)
  let arr = await userConnectionController.getConnectionList(id)
  let idArr=[]
  for(let item of arr){
    idArr.push(item.up_id)
  }
  userInfoModel.belongsTo(userModel, {
    foreignKey: 'user_id',
    targetKey: 'id',
  })
  let upInfo=await userInfoModel.findAll({
    attributes:['user_id','sex','birthday','address','personalIntroduction'],
    where: {
      user_id: idArr
    },
    include: [{
      attributes: ['user_name'],
      model: userModel
    }]
  })
  return res.sendResult('0', '获取成功', upInfo)
})
module.exports = userConnection