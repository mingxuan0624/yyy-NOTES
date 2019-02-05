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
        let postData = await parsePostData(ctx);
        ctx.body = postData
    }else{
        ctx.body = "<h2>404!</h2>"
    }
        
});

//用node的原生req接收post请求,写一个方法
function parsePostData(ctx){
    return new Promise((resolve,reject) => {
        try {
            //接收post参数
            let postdata = "";
            //ctx.req是node原生,监听数据传入
            ctx.req.addListener('data', (data) => {
                //post数据可能是多个
                postdata += data;
            })
            //on是Koa2提供的监听事件
            ctx.req.on('end', function(){
                let perseData = parseQueryStr(postdata);
                resolve(perseData);
            })
        } catch (error) {
            reject(errer);
        }
    })
}

//字符串转换JOSN对象
function parseQueryStr(queryStr){
    //创建空对象,用于接收
    let queryData = {};
    //把queryStr拆分成数组,以&为拆分
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    //[ 'userName=yangyongyong','Age=31','website=http%3A%2F%2Fjspang.com' ]
    console.log(queryStrList.entries())
    //entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。
    for([index, queryStr] of queryStrList.entries()){
        let itemList = queryStr.split('=');
        console.log(itemList);
        //[ 'userName', 'yangyongyong' ][ 'Age', '32' ][ 'website', 'http%3A%2F%2Fjspang.com' ]
        
        //实现key,value
        //decodeURIComponent(),字符串转换
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData;
}
app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});