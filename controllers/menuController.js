const {
  menuModel
} = require('../models/menuModel')
// 获取菜单
function getMenu(params) {
  if(params.role === '-1') {
    return menuModel.findAll({
      where:{
        role:params.role
      }
    })    
  }else if(params.role==='0') {
    return menuModel.findAll({
      where:{
        role:['-1','0']
      }
    })    
  }
  return menuModel.findAll()    
}

module.exports = {
  getMenu
}