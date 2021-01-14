const Router = require('koa-router')
const home = new Router()

// /home
home.get('/', async (ctx, next) => {
    //从ctx中读取get传值
    console.log(ctx.url);
    console.log(ctx.query);
    console.log(ctx.querystring);

    //ctx里面的request里面获取get传值
    console.log(ctx.request.url);
    console.log(ctx.request.query);
    console.log(ctx.request.querystring);

    ctx.response.status = 200
    ctx.response.body = '<h1>home</h1>'
    await next()
})

// home/list
home.get('/list', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = '<h1>home-list</h1>'
    await next()
})

module.exports = home