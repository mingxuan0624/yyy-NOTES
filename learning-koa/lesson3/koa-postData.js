const Koa = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
    if(ctx.url === '/' && ctx.method === 'GET'){
        //显示页面
        let html1 = `
            <h1>YangSen Koa request POST</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName"><br/>
                <p>Age</p>
                <input name="Age"><br/>
                <p>website</p>
                <input name="website"><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body = html1;
    }else if(ctx.url === '/' && ctx.method === 'POST'){
        ctx.body = '接收到POST参数!'
    }else{
        ctx.body = "<h2>404!</h2>"
    }
        
});

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});