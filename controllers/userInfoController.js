const {
  userInfoModel
} = require('../models/userInfoModel')
const {
  userModel
} = require('../models/userModel')
function addUserInfo(params) {
  return userInfoModel.create({
    user_id:params.user_id,
    sex:params.sex,
    birthday:params.birthday,
    address:params.address,
    personalIntroduction:params.personalIntroduction,
    img:params.img
  })
}

function updateUserInfo(params) {
  return userInfoModel.update({
    sex:params.sex,
    birthday:params.birthday,
    address:params.address,
    personalIntroduction:params.personalIntroduction,
    img:params.img
  },{
    where:{
      user_id:params.user_id
    }
  })
}

function getUserInfo(params) {
  userInfoModel.belongsTo(userModel, {
    foreignKey: 'user_id',
    targetKey: 'id',
  })
  return userInfoModel.findAll({
    where:{
      user_id:params.user_id
    },
    include:[
      {
        attributes:['user_name'],
        model:userModel
      }
    ]
  })
}

function getUserImg(user_id) {
  return userInfoModel.findAll({
    attributes:['img'],
    where:{
      user_id
    }
  })
}
module.exports={
  addUserInfo,
  updateUserInfo,
  getUserInfo,
  getUserImg
}