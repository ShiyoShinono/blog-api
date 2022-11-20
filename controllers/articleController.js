const {
  articleModel
} = require('../models/articleModel')
const {
  userModel
} = require('../models/userModel')
const {
  Op
} = require("sequelize")
// 获取封面数据
function getCover() {
  articleModel.belongsTo(userModel, {
    foreignKey: 'user_id',
    targetKey: 'id',
  })
  return articleModel.findAll({
    attributes: ['id', 'img', 'title', 'tag', 'createdTime', 'read'],
    where: {
      secret: '0'
    },
    include:[
      {
        attributes:['user_name'],
        model:userModel
      }
    ],
    order: [
      ['createdTime', 'DESC']
    ]
  })
}
// 新增博客
function addArticle(params) {
  return articleModel.create({
    img: params.img,
    title: params.title,
    content: params.content,
    tag: params.tag,
    user_id: params.user_id,
    secret: params.secret,
    createdTime: params.createdTime
  })
}
// 删除博客
function deleteArticle(params) {
  return articleModel.destroy({
    where: {
      id: params.id
    }
  })
}
// 获取博客主体内容
function getContent(params) {
  articleModel.belongsTo(userModel, {
    foreignKey: 'user_id',
    targetKey: 'id',
  })
  return articleModel.findAll({
    where: {
      id: params.id
    },
    include:[
      {
        attributes:['user_name'],
        model:userModel
      }
    ]
  })
}
// 重新编辑博客
function updateArticle(params) {
  console.log(params)
  return articleModel.update({
    img: params.img,
    title: params.title,
    content: params.content,
    tag: params.tag,
    user_id: params.user_id,
    secret: params.secret,
    createdTime: params.createdTime,
  }, {
    where: {
      id: params.id
    }
  })
}
// 获得所有公开博客
function getAllArticle() {
  articleModel.belongsTo(userModel, {
    foreignKey: 'user_id',
    targetKey: 'id',
  })
  return articleModel.findAll({
    attributes: ['id', 'title', 'createdTime'],
    where:{
      secret:'0'
    },
    include:[
      {
        attributes:['user_name'],
        model:userModel
      }
    ],
    order: [
      ['createdTime', 'DESC']
    ]
  })
}
// 根据id获得博客内容
function getArticleById(params) {
  return articleModel.findAll({
    where: {
      user_id: params.user_id
    },
    order: [
      ['createdTime', 'DESC']
    ]
  })
}
// 模糊查询
function getArticleByFuzzy(params) {
  articleModel.belongsTo(userModel, {
    foreignKey: 'user_id',
    targetKey: 'id',
  })
  return articleModel.findAll({
    attributes: ['id', 'img', 'title', 'tag', 'createdTime', 'read'],
    where: {
      [Op.and]: {
        title: {
          [Op.substring]: params.key
        },
        secret: '0'
      }
    },
    include:[
      {
        attributes:['user_name'],
        model:userModel
      }
    ],
    order: [
      ['createdTime', 'DESC']
    ]
  })
}

function getArticleByTag(tagArr) {
  articleModel.belongsTo(userModel, {
    foreignKey: 'user_id',
    targetKey: 'id',
  })
  return articleModel.findAll({
    attributes: ['id', 'img', 'title', 'tag', 'createdTime', 'read'],
    where: {
      id: tagArr
    },
    include:[
      {
        attributes:['user_name'],
        model:userModel
      }
    ],
    order: [
      ['createdTime', 'DESC']
    ]
  })
}

function updateRead(params) {
  return articleModel.update({
    read: params.read,
    tag: params.tag
  }, {
    where: {
      id: params.id
    }
  })
}
// 删除博客
function deleteArticleByAdmin(params) {
  return articleModel.destroy({
    where: {
      id: params.id
    }
  })
}
module.exports = {
  getCover,
  addArticle,
  deleteArticle,
  getContent,
  updateArticle,
  getAllArticle,
  getArticleById,
  getArticleByFuzzy,
  getArticleByTag,
  updateRead,
  deleteArticleByAdmin
}