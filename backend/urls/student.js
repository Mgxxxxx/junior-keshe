const { queryStudentCourses, queryStudentNoSeletCourse } = require("../mysql/queryUtils");
const { sAddCourse, sDelCourse } = require("../mysql/modifyUtils");

const Router = require('koa-router')
const student = new Router()

// /student
student.get('/', async (ctx, next) => {
    //从ctx中读取get传值
    // console.log(ctx.url);
    // console.log(ctx.query);
    // console.log(ctx.querystring);

    //ctx里面的request里面获取get传值
    // console.log(ctx.request.url);
    // console.log(ctx.request.query);
    // console.log(ctx.request.querystring);

    try {
        let courses = await queryStudentCourses(ctx.query.account);
        // console.log(courses);
        ctx.response.body = courses;
    } catch (err) {
        console.log(err);
        ctx.response.body = err;
    }

    ctx.response.status = 200
    await next()
})

// /student/coursesy
student.get('/coursesy', async (ctx, next) => {

    // console.log(ctx.query);
    let noSelectCourse = await queryStudentNoSeletCourse(ctx.query.account);
    // console.log(noSelectCourse);
    ctx.response.status = 200;
    ctx.response.body = noSelectCourse;
    await next();
})

student.post('/addcourse', async (ctx, next) => {
    const rb = ctx.request.body
    try {
        let res = await sAddCourse(rb.cno, rb.sno, rb.time);
        // console.log(res);
        ctx.response.body = '学生选课成功';
    } catch (err) {
        console.log(err);
        ctx.response.body = err;
    }
    await next()
})

student.post('/delcourse', async (ctx, next) => {
    const rb = ctx.request.body
    try {
        let res = await sDelCourse(rb.cno, rb.sno);
        // console.log(res);
        ctx.response.body = '学生退课成功';
    } catch (err) {
        ctx.response.body = err
    }
    await next()
})

module.exports = student