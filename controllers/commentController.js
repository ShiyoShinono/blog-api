const {
  commentModel
} = require('../models/commentModel')
const {
  userModel
} = require('../models/userModel')
const {
  userInfoModel
} = require('../models/userInfoModel')
// 获取评论
function getComment(value) {
  commentModel.belongsTo(userModel, {
    foreignKey: 'user_id',
    targetKey: 'id',
  })
  return commentModel.findAll(value)
}

function deleteComment(params) {
  commentModel.destroy({
    where:{
      id:params.id
    }
  })
}

function addComment(params) {
  commentModel.create({
    content:params.content,
    user_id:params.user_id,
    article_id:params.article_id,
    createdTime:params.createdTime
  })
}
module.exports = {
  getComment,
  deleteComment,
  addComment
}