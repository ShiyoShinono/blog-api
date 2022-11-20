const express = require('express')
const comment = express.Router()
const {
  commentModel
} = require('../models/commentModel')
const {
  userModel
} = require('../models/userModel')
const commentController = require('../controllers/commentController')
const userInfoController = require('../controllers/userInfoController')
//获取博客评论
comment.get('/comment/getComment',async(req,res)=>{
  const params= req.query
  let commentInfo = await commentController.getComment({
    attributes:['id','user_id','content','createdTime'],
    where:{
      article_id:params.article_id
    },
    include:[
      {
        attributes:['user_name'],
        model:userModel
      }
    ]
  })
  for(let i=0;i<commentInfo.length;i++) {
    let data =await userInfoController.getUserImg(commentInfo[i].user_id)
    if(data[0]?.img){
      commentInfo[i].img=data[0].img
    }else {
      commentInfo[i].img='http://127.0.0.1:3001/uploads/avatar.jpg'
    }
  }
  const commentMap=commentInfo.map(item => {
    return {
      id:item.id,
      commentUser:{
        id:item.user_id,
        nickName:item.user.user_name,
        avatar:item.img
      },
      content:item.content,
      createDate:item.createdTime
    }
  })
  res.sendResult('0', '获取成功',commentMap)
})
// 删除评论
comment.post('/comment/deleteComment',async(req,res)=>{
  const params=req.body
  await commentController.deleteComment(params)
  return res.sendResult('0', '删除成功', {})
})
// 添加评论
comment.post('/comment/addComment',async(req,res)=>{
  const params=req.body
  if(params.content) {
    const addInfo = await commentController.addComment(params)
    return res.sendResult('0','添加成功',addInfo)
  }else {
    return res.sendResult('-1','评论信息不能为空',{})
  }
})


module.exports = comment