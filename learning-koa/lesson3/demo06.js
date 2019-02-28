const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use();

app.listen(3000, () => {
console.log('starting is at 3000')
})
