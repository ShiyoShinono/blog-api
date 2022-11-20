const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const user = express.Router()
const {
  userModel
} = require('../models/userModel')
const {
  userInfoModel
} = require('../models/userInfoModel')
const userController = require('../controllers/userController')
const nodeMailer = require('../helpers/nodemailer')
const {
  Op
} = require("sequelize");

// 注册
user.post('/user/signUp', async (req, res) => {
  const params = req.body
  const {
    user_name
  } = params
  const userSignUpInfo = await userModel.findOne({
    where: {
      user_name
    }
  })
  if (userSignUpInfo) {
    return res.sendResult('-1', '用户名已存在，注册失败', {})
  }
  // 密码加密
  params.user_pwd = await bcrypt.hashSync(params.user_pwd, 15)
  let data = await userController.signUp(params)
  console.log(data.id);
  await userInfoModel.create({
    user_id: data.id
  })
  return res.sendResult('0', '注册成功', {})
})

// 登录
user.post('/user/signIn', async (req, res) => {
  const params = req.body
  const {
    user_name,
    user_pwd
  } = params
  const userSignUpInfo = await userModel.findOne({
    where: {
      user_name
    }
  })
  if (!userSignUpInfo) {
    return res.sendResult('-1', '用户不存在，请注册', {})
  }
  const pwdValidate = await bcrypt.compare(user_pwd, userSignUpInfo.dataValues.user_pwd)
  if (!pwdValidate) {
    return res.sendResult('-1', '用户名或密码错误', {})
  }
  // 生成token,24h过期
  const token = jwt.sign({
    data: user_name,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
  }, 'wuhuqifei')
  return res.sendResult('0', '登陆成功', {
    user_id: userSignUpInfo.id,
    user_name: userSignUpInfo.user_name,
    token: token,
    user_role: userSignUpInfo.user_role
  })
})
// 忘记密码发送验证码
user.post('/user/sendEmail', async (req, res) => {
  const user_valid = Math.random().toString(36).slice(-6)
  const params = req.body
  const {
    user_name,
    user_email
  } = params
  params.user_valid = user_valid
  const isSendEmail = await userModel.findOne({
    where: {
      user_name,
      user_email
    }
  })
  if (!isSendEmail) {
    return res.sendResult('-1', '未找到对应用户', {})
  }
  params.user_validExp = Date.now()
  userController.sendValid(params).then(() => {
    nodeMailer.sendEmail(user_email, user_valid)
    res.sendResult('0', '发送成功', {})
  })
})

// 校验验证码
user.post('/user/checkValid', async (req, res) => {
  const params = req.body
  const {
    user_name,
    user_email,
    user_valid
  } = params
  const checkValid = await userModel.findOne({
    where: {
      user_name,
      user_email,
      user_valid,
      user_validExp: {
        [Op.gte]: Date.now() - (60 * 5 * 1000)
      }
    }
  })
  if (!checkValid) {
    return res.sendResult('-1', '验证码无效', {})
  }
  res.sendResult('0', '验证成功', {})
})

user.post('/user/resetPwd', async (req, res) => {
  const params = req.body
  const {
    user_name,
    user_email,
    user_valid
  } = params
  // 重置密码时也进行验证码校验，防止直接调用该接口绕过验证
  const checkValid = await userModel.findOne({
    where: {
      user_name,
      user_email,
      user_valid,
      user_validExp: {
        [Op.gte]: Date.now() - (60 * 5 * 1000)
      }
    }
  })
  if (!checkValid) {
    return res.sendResult('-1', '非法操作', {})
  }
  params.user_pwd = await bcrypt.hashSync(params.user_pwd, 15)
  userController.resetPwd(params).then(() => {
    return res.sendResult('0', '修改密码成功', {})
  })
})


module.exports = user