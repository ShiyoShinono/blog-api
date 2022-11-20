const express= require('express')
const app= express()
var path = require('path')
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ extended: false,limit:'50mb' }))

// 自定义响应内容中间件
const resextra = require('./helpers/resextra')
app.use(resextra)

// cors跨域
const cors = require('cors')
app.use(cors())

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')))

// 自定义验证中间件
const auth=require('./helpers/authorization')
app.use(auth)

const user=require('./routers/user')
const menu=require('./routers/menu')
const article=require('./routers/article')
const comment=require('./routers/comment')
const tag=require('./routers/tag')
const userInfo=require('./routers/userInfo')
const userConnection=require('./routers/userConnection')
app.use(user).use(menu).use(article).use(comment).use(tag).use(userInfo).use(userConnection)

app.set('port',3001)
app.listen(app.get('port'),()=>{
  console.log(`Server on http://localhost:${app.get('port')}`)
})