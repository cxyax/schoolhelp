# 前言
一个集合表白墙、失物招领、兼职和闲置二手买卖的云开发微信小程序
# 校园服务小程序
拥有 表白墙、失物招领、兼职、闲置物品等功能，无后台，云开发，只需要搭建云数据库即可

## 开发初衷
开发本小程序的初衷是适应主小程序（校园骑士综合服务）
<img src="https://z3.ax1x.com/2021/03/29/cPtiLT.png">

## 基于云开发（参考文档）
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 部署教程
1. 将该项目导入微信开发者工具
2. 更改 miniprogram/app.js 里面的云环境id
``` bash
wx.cloud.init({
	env:'xxx',  //xxx为你的云环境id
    traceUser: true
})
```
3. 创建对应的五个数据库集合（biaobai、found、lost、xianzhi、jianzhi）
4. 将 cloudfunctions 文件下的四个文件上传云函数部署（右键点击，选择第三个选项“上传并部署：云端安装环境”）
# 截图
<img src="https://z3.ax1x.com/2021/03/29/cPYTzt.png">
<img src="https://z3.ax1x.com/2021/03/29/cPYXdg.png">
<img src="https://z3.ax1x.com/2021/03/29/cPYxij.png">
<img src="https://z3.ax1x.com/2021/03/29/cPtSWn.png">

