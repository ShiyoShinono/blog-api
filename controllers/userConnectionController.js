const {
  userConnectionModel
} = require('../models/userConnectionModel')
const {
  userModel
} = require('../models/userModel')
const {
  articleModel
} = require('../models/articleModel')

function getConnection(params) {
  return userConnectionModel.findAll({
    where: {
      up_id: params.up_id,
      fans_id: params.fans_id
    }
  })
}

function addUserConnection(params) {
  return userConnectionModel.create({
    up_id: params.up_id,
    fans_id: params.fans_id
  })
}

function getUserConnection(id) {
  userConnectionModel.belongsTo(userModel, {
    foreignKey: 'up_id',
    targetKey: 'id',
  })
  userConnectionModel.belongsTo(userModel, {
    foreignKey: 'fans_id',
    targetKey: 'id',
  })
  return userConnectionModel.findAll({
    attributes: ['up_id'],
    where: {
      fans_id: id
    }
  })
}

function getConnectionList(id) {
  return userConnectionModel.findAll({
    attributes: ['up_id'],
    where: {
      fans_id: id
    }
  })
}

function deleteUserConnection(params) {
  return userConnectionModel.destroy({
    where: {
      up_id: params.up_id,
      fans_id: params.fans_id
    }
  })
}
module.exports = {
  getConnection,
  addUserConnection,
  getUserConnection,
  deleteUserConnection,
  getConnectionList
}