const jwt = require('jsonwebtoken')
// 进行权限验证
module.exports = function (req, res, next) {
  // 获取当前访问的api地址
  const url = req._parsedUrl.pathname
  // 不需要进行验证的api,'/article/getCover','/menu/getMenu'
  var urlArr = ['/user/signIn', '/user/signUp', '/user/sendEmail', '/user/checkValid', '/user/resetPwd',]
  // 验证当前的api是否存在不需要验证的api的列表里面
  var is_next = urlArr.find(item => item === url)
  if (is_next) {
    next()
    return false
  }
  // 获取api传递过来的token
  let token = req.headers.authorization || ''
  if (req.method == 'Option') res.send(200)
  else {
    jwt.verify(token, 'wuhuqifei', async (err, data) => {
      if (err) return res.sendResult('401', '无权限访问', {})
    })
    next()
  }

}