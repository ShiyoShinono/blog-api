const express = require('express')
const article = express.Router()
const {
  upload
} = require('../helpers/multer')
const {
  articleModel
} = require('../models/articleModel')
const {
  tagModel
} = require('../models/tagModel')
const articleController = require('../controllers/articleController')

// 获取文章封面数据
article.get('/article/getCover', async (req, res) => {
  let cover = await articleController.getCover()
  return res.sendResult('0', '获取成功', {
    cover: cover
  })
})

// 发布博客
article.post('/article/addArticle', (req, res) => {
  let params = req.body
  articleController.addArticle(params).then(data => {
    res.sendResult('0', '发布成功', data)
  })
})

// 上传图片
article.post('/article/upload', upload.single('img'), async (req, res, next) => {
  let imgPath = req.file.path.split('public')[1]
  let imgUrl = 'http://127.0.0.1:3001' + imgPath
  res.sendResult('0', '发布成功', imgUrl)
})
// 删除博客
article.post('/article/delete', async (req, res) => {
  let params = req.body
  articleController.deleteArticle(params).then(() => {
    res.sendResult('0', '删除成功', {})
  })
})
// 获取博客内容
article.get('/article/getContent', async (req, res) => {
  let params = req.query
  articleController.getContent(params).then(data => {
    res.sendResult('0', '获取成功', data)
  })
})
// 更新博客
article.post('/article/updateArticle', async (req, res) => {
  let params = req.body
  articleController.updateArticle(params).then(data => {
    res.sendResult('0', '修改成功', {})
  })
})
// 获取所有博客
article.get('/article/getAllArticle', async (req, res) => {
  articleController.getAllArticle().then(data => {
    res.sendResult('0', '获取成功', data)
  })
})
// 获取该用户发布的博客信息
article.get('/article/getArticleById', async (req, res) => {
  let params = req.query
  articleController.getArticleById(params).then(data => {
    res.sendResult('0', '获取成功', data)
  })
})
// 模糊查询博客
article.get('/article/getArticleByFuzzy', async (req, res) => {
  let params = req.query
  articleController.getArticleByFuzzy(params).then(data => {
    res.sendResult('0', '获取成功', data)
  })
})
// 根据标签查询博客
article.get('/article/getArticleByTag', async (req, res) => {
  let params = req.query.tag
  let tags = await articleModel.findAll({
    attributes: ['id', 'tag']
  })
  let tagArr = []
  for (let item of tags) {
    if (item.tag.indexOf(params) !== -1) {
      tagArr.push(item.id)
    }
  }
  let data = await articleController.getArticleByTag(tagArr)
  let tagInfo = await tagModel.findAll({
    attributes: ['id', 'searchNumber'],
    where: {
      tag_name: params
    }
  })
  let searchNumber = 0
  let id = 0
  for (let item of tagInfo) {
    searchNumber = item.searchNumber
    id = item.id
  }
  searchNumber++
  await tagModel.update({
    searchNumber
  }, {
    where: {
      id
    }
  })
  res.sendResult('0', '获取成功', data)
})
// 更新阅读量
article.post('/article/updateRead', async (req, res) => {
  let id = req.body.id
  let data = await articleModel.findAll({
    attributes: ['read', 'tag'],
    where: {
      id
    }
  })
  let read = 0
  let tag = ''
  for (let item of data) {
    read = item.read
    tag = JSON.stringify(item.tag)
  }
  read++
  let params = {
    read,
    tag,
    id
  }
  await articleController.updateRead(params)
  res.sendResult('0', '更新成功', {})

})
// 管理员删除博客
article.post('/article/deleteArticleByAdmin', (req, res) => {
  let params = req.body
  if (params.role && params.role === '1') {
    articleController.deleteArticle(params).then(() => {
      res.sendResult('0', '删除成功', {})
    })
  } else {
    res.sendResult('-1', '违法操作', {})
  }

})
module.exports = article