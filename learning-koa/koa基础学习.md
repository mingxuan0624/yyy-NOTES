### Koa的基础学习
#### Koa是由Express原班人马打造的,致力于一个更小,更富有表现,更健壮的web框架.采用了 ==async==和==await==的方式执行异步操作.
##### 自己对==async==和==await==还不熟悉的,可以看看你阮一峰老师的[ES6入门](http://es6.ruanyifeng.com/)进行了解.
#### 一. Koa的环境搭建
#### Koa是依赖node v7.6.0版本进行开发的.所以你安装的node版本要高于v7.6.0这个版本.
```javascript
//我这里安装的版本
node -v
v 10.15.0
```
##### 如果你不知道node安装的位置.你可以使用where node来查找.
```javascript
where node
//我的node位置
D:\node.js\node.exe
```
##### 当你把node安装完成后,接下来就是安装Koa来搭建环境了.记得要创建一个koa的文件夹,我这里创建的是learning-koa,然后执行下面的代码.
```javascript
//创建learning-koa文件夹
mkdir learning-koa
//进入learning-koa文件夹
cd learning-koa
//然后进行npm项目初始化,然后回生成一个package.json文件
npm init 
//安装koa
//这里--save的意思: 将模块安装到项目目录下，并在package文件的dependencies节点写入依赖
npm install koa --save
```
##### 安装完了koa后,就可以写个简单的程序了.创建一个index.js文件,写入以下代码.
```javascript
//用require引入koa
const Koa = require('koa');

//创建一个Koa对象来表示web app本身
const app = new Koa();

//对于任何请求,app将调用async异步函数来处理请求.
app.use( async(ctx) => {
    ctx.body = 'It is my first koa page!'
})

//进行监听
app.listen(3000);
console.log('app is strating at port 3000');
```

#### 二.async/await的使用方法
##### 
```javascript


```
```javascript


```
