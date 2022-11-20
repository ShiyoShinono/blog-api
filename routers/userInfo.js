const express = require('express')
const userInfo = express.Router()
const {
  userInfoModel
} = require('../models/userInfoModel')
const userInfoController = require('../controllers/userInfoController')
const { userModel } = require('../models/userModel')
// 修改用户信息
userInfo.post('/userInfo/editUserInfo', async (req, res) => {
  let params = req.body
  let userInfo = await userInfoModel.findOne({
    where: {
      user_id: params.user_id
    }
  })
  if (userInfo) {
    await userInfoController.updateUserInfo(params)
    return res.sendResult('0', '修改成功', {})
  }
  await userInfoController.addUserInfo(params)
  return res.sendResult('0', '修改成功', {})
})
// 获取用户信息
userInfo.get('/userInfo/getUserInfo', async (req, res) => {
  let params = req.query
  let userInfo = await userInfoModel.findOne({
    where: {
      user_id: params.user_id
    }
  })
  if (userInfo) {
    let data=await userInfoController.getUserInfo(params)
    return res.sendResult('0', '获取成功', data)
  }
  let data=await userModel.findAll({attributes:['id','user_name'],where:{id:params.user_id}})
  let user=data.map(item=>{
    return 		{
			"user_id": item.id,
			"sex": '1',
			"birthday": '',
			"address": '',
			"personalIntroduction": '',
			"img": 'http://127.0.0.1:3001/uploads/avatar.jpg',
			"user": {
				"user_name": item.user_name
			}
		}
  })
  return res.sendResult('0', '获取成功', user)
})
module.exports = userInfo