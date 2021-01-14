const { queryUser, queryUserInfo, queryStudentCourses } = require("../mysql/queryUtils")

const Router = require('koa-router')
const login = new Router()


login.post('/', async (ctx, next) => {
    const rb = ctx.request.body
    // console.log(rb);
    try {
        let user = await queryUser(rb.userno, rb.pwd, rb.role);
        let hasUser = !user.length ? false : true;
        // console.log(hasUser);
        let data = { usersInfo: null, loginStatu: null };
        if (hasUser) {
            let usersInfo = await queryUserInfo(rb.userno, rb.role);
            // console.log(usersInfo);
            data.usersInfo = usersInfo;
            data.loginStatu = true;
            ctx.response.body = data;
        } else {
            data.loginStatu = false;
            ctx.response.body = data;
        }
    } catch (err) {
        console.log(err);
        ctx.response.body = err
    }
    await next()
})

module.exports = login