//用require引入koa
const Koa = require('koa');

//创建一个Koa对象来表示web app本身
const app = new Koa();

//对于任何请求,app将调用async异步函数来处理请求.
//ctx
app.use( async(ctx) => {
    ctx.response.body = 'It is my first koa page!'
})

//进行监听
app.listen(3000);
console.log('app is strating at port 3000')