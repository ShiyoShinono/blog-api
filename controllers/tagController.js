const {
  tagModel
} = require('../models/tagModel')

// 添加tag
function addTag(tag_name) {
  return tagModel.bulkCreate(tag_name,{
    updateOnDuplicate:['tag_name']
  })
}
// 降序获得tag
function getTagByDesc() {
  return tagModel.findAll({
    order:[
      ['searchNumber','DESC']
    ],
    attributes: ['tag_name']
  })
}

module.exports = {
  addTag,
  getTagByDesc
}