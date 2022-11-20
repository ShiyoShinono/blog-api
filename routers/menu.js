const express = require('express')
const menu = express.Router()
const {
  menuModel
} = require('../models/menuModel')
const menuController = require('../controllers/menuController')

//获取菜单
menu.get('/menu/getMenu',async (req,res)=>{
  const params = req.query
  const menu_name = await menuController.getMenu(params)
  return res.sendResult('0', '获取成功', {
    menu:menu_name
  })
})

module.exports = menu