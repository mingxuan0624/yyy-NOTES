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
    ctx.response.body = 'It is my first koa page!'
})

//进行监听
app.listen(3000);
console.log('app is strating at port 3000');
```
#### 这里的ctx(执行上下文)我不是特别懂,所以特意去了解了一下.
#### Koa提供了`ctx(执行上下文)`这么一个对象.用来表示一次对话中的`HTTP Request和HTTP Response`.用这个就可以控制返回给用户的数据了.
#### 页面中显示的内容`It is my first koa page`就是通过ctx.response这个属性发送给页面body中的.既然发送给页面的,就可以想的到`ctx.response`的作用和`HTTP Response`一样的.同样的,`ctx.request`的作用和'HTTP Request'一样.
#### 再Koa源码中只有四个文件,其中负责对外暴露方法的是 =='application.js'==,而==context.js==则是封装了`请求和相应的`的==上下文ctx==.这里的 ==request.js(请求)和response.js(响应)为context.js提供支持.==

#### 二.async/await的使用方法
#### 三.Koa中GET的数据请求
##### koa2中GET请求通过request接收,但是接收得方法有两种.
- query: 返回得是格式化话的参数对象
- querystring: 返回的是请求的字符串
##### 
```javascript
//demo03.js
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
        req_querystring
    }
});
app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});
//在启动node demo03.js后,你可以在浏览器中添加'http://127.0.0.1:3000/?user=yangseng&age=29'.
//页面显示一下数据
{
    "url": "/?user=yangseng&age=29",
    "req_query": {
        user: "yangseng",
        age: "29"
    },
    "req_querystring": "user=yangseng&age=29",
    "ctx_query": {
        user: "yangseng",
        age: "29"
    },
    "ctx_querystring": "user=yangseng&age=29",
}
//从上面的数据显示可以看出"req_query","ctx_query"展示出来的数据是JSON对象,不需要多做处理.而"req_querystring"展示出来的数据是一个字符串,需要做处理.一般工作还是"req_query","ctx_querystring"用的多,省去不少麻烦.
```
#### Koa中POST请求数据
##### 获取POST请求的步骤:
- 解析上下文中ctx中原生node.js对象req
- 将POST表单数据解析成querystring字符串(例如:user=yangseng&age=29)
- 然后将字符串转换成JSON格式
##### ctx.request和ctx.req的区别:
- ctx.request是Koa2中context经过封装的对象,用起来更直观,简单
- ctx.req:是context提供的node.js原生HTTP请求对象,看起来不怎么直观,但是可以得到更多的内容,适合深度编程.
##### ctx.method 得到的数据类型
##### Koa2中提供了ctx.method属性,可以得到请求的类型,然后根据不同的数据类型编写不同的相应方法.根据请求类型得到不同的页面内容,GET请求得到表单页面,POST进行处理页面内容.
```javascript
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

```
#### POST数据转换成JSON对象
```javascript
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
```
#### Koa-bodyparser中间件
```javascript
//安装
npm install koa-bodyparser@3 --save
//进行调用
app.use(bodyParser());
```
```javascript
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

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
        //之前接收post请求是自己写方法,使用koa-bodyparser后,post接收到的数据存储在ctx.request.body;
        let postData = ctx.request.body;
        ctx.body = postData
    }else{
        ctx.body = "<h2>404!</h2>"
    }
        
});

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});
```
#### Koa2原生路由实现

```javascript
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

function render(page){
    return new Promise((resolve, reject) => {
        //es5写法
        //let pageUrl = './page' + page;
        //ES6
        let pageUrl = `./page/${page}`;
        //fs.readFile是node中读取读取文件
        fs.readFile(pageUrl, "binary", (err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        } )
    }) 
}

async function router(url){
    let page = '404.html';
    switch(url){
        case '/':
            page="index.html";
            break;
        case 'index':
            page="index.html";
            break;
        case '/todo':
            page="todo.html";
            break;
        case '/404':
            page="404.html";
            break;
        default: 
            break;
    }
    let html = await render(page);
    console.log(html);
    return html;
}

app.use(async(ctx) => {
    let url = ctx.request.url;
    let html = await router(url);
    ctx.body = html;
})
app.listen('3000');
```


```javascript

```


