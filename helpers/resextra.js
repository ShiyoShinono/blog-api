// 添加统一的返回结果方法
module.exports = function (req, res, next) {
  res.sendResult = function (code, msg, body) {
    res.json({
      "code": code,
      "msg": msg,
      "body": body
    })
  }
  next()
}