// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const cors = require('koa2-cors'); //跨域处理
const Router = require("koa-router");
const bodyParser = require('koa-bodyparser')

const fs = require('fs')

const config = require('./config/default')
const mysql = require('./mysql')

// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(cors());
app.use(bodyParser())
const router = new Router();

// 对于任何请求，app将调用该异步函数处理请求：
//首页
app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        ctx.response.status = 200;
        ctx.response.body = "<h1>Hello World</h1>";
    }
    await next();
})

// 其他页面通过 router 加载
let urls = fs.readdirSync(__dirname + '/urls')
urls.forEach((element) => {
    let module = require(__dirname + '/urls/' + element)
    /*
      urls 下面的每个文件负责一个特定的功能，分开管理
      通过 fs.readdirSync 读取 urls 目录下的所有文件名，挂载到 router 上面
    */
    router.use('/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
})
app.use(router.routes())

// 在端口3000监听:
app.listen(config.port);
console.log('app started at port 3000...');
