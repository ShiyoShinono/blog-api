const {
  userModel
} = require('../models/userModel')
// 注册
function signUp(params) {
  return userModel.create({
    user_name: params.user_name,
    user_pwd: params.user_pwd,
    user_email: params.user_email,
    createdTime:params.createdTime
  })
}
// 存储验证码及验证码时间
function sendValid(params) {
  return userModel.update({user_valid:params.user_valid,user_validExp:params.user_validExp},{
    where: {
      user_name: params.user_name,
      user_email:params.user_email
    }
  })
}

function resetPwd(params){
  return userModel.update({user_pwd:params.user_pwd},{
    where:{
      user_name: params.user_name,
      user_email:params.user_email,
      user_valid:params.user_valid
    }
  })
}

module.exports = {
  signUp,
  sendValid,
  resetPwd
}