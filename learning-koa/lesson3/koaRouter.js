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