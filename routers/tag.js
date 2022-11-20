const express = require('express')
const tag = express.Router()
const {
  tagModel
} = require('../models/tagModel')
const tagController = require('../controllers/tagController')
// 添加标签
tag.post('/tag/addTag',async (req,res)=>{
  const params = JSON.parse(req.body.tag_name)
  let tags=params.map(item => {
    return {
      tag_name:item
    }
  })
  await tagController.addTag(tags)
  return res.sendResult('0','添加成功',{} )
})
// 倒序获取标签
tag.get('/tag/getTagByDesc',async (req,res) => {
  let tags=await tagController.getTagByDesc()
  return res.sendResult('0','获取成功',tags)
})
module.exports = tag