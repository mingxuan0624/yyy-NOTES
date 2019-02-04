//koa2中GET请求通过request接收,但是接收得方法有两种.
//query: 返回得是格式化话的参数对象
//querystring: 返回的是请求的字符串
const Koa = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
    let url =ctx.url;
    //从request中接收GET请求
    let request =ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;

    //从ctx(上下文)中接收GET请求
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;

    ctx.body={
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
});
app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});