const nodemailer = require('nodemailer');
//设置邮箱配置
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com', //邮箱服务的主机，如smtp.qq.com
  port: '465', //对应的端口号
  //开启安全连接
  secureConnection: true,
  //用户信息
  auth: {
    user: '1435798414@qq.com',
    pass: 'wlavraxeasxdfigf'
  }
});

function sendEmail(user_email,user_valid) {
  //设置收件人信息
  let mailOptions = {
    from: '1435798414@qq.com', //谁发的
    to: `${user_email}`, //发给谁
    subject: '【博客系统】密码重置', //主题是什么
    html: `<p>【博客系统】验证码：${user_valid}，以上验证码5分钟内有效。您正在重置密码，为保证账户安全，请勿泄露他人。</p>`, //html模板
    //附件信息
    attachments: []
  };
  //发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(info)
  })
}


module.exports = {
  sendEmail
}