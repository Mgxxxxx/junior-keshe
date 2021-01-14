const {
    queryTeaGroup,
    queryTeaWithClass,
    queryTeaCourse,
    queryStuGrade,
    queryDeans,
    queryAllStudent,
    queryAllTeacher,
    queryAllCourse
} = require("../mysql/queryUtils");

const { setGrade } = require("../mysql/modifyUtils")

const Router = require('koa-router');
const student = require("./student");
const teacher = new Router()

// /teacher
teacher.get('/', async (ctx, next) => {
    //从ctx中读取get传值
    // console.log(ctx.query);

    try {
        let tno = ctx.query.account;
        let [teaGroupInfo, teaWithClass] = await Promise.all(
            [queryTeaGroup(tno), queryTeaWithClass(tno)]);
        // let teaGroupInfo = await queryTeaGroup(ctx.query.account);
        // console.log(teaGroupInfo);
        ctx.response.body = {};
        ctx.response.body['teaGroupInfo'] = teaGroupInfo;
        ctx.response.body['teaWithClass'] = teaWithClass;
    } catch (err) {
        console.log(err);
        ctx.response.body = err;
    }

    ctx.response.status = 200
    await next()
})

// teacher/teacourse
teacher.get('/teacourse', async (ctx, next) => {
    try {
        let teaCourse = await queryTeaCourse(ctx.query.account);
        // console.log(teaCourse);
        ctx.response.body = teaCourse;
    } catch (err) {
        console.log(err);
        ctx.response.body = err;
    }
    ctx.response.status = 200
    await next()
})

teacher.get('/stugrade', async (ctx, next) => {
    try {
        let studentsGrade = await queryStuGrade(ctx.query.account);
        console.log(studentsGrade);
        ctx.response.body = studentsGrade;
    } catch (error) {
        console.log(err);
        ctx.response.body = err;
    }
    await next();
})

teacher.post('/setgrade', async (ctx, next) => {
    const rb = ctx.request.body
    try {
        let res = await setGrade(rb.sno, rb.cno, rb.grade);
        // console.log(res);
        ctx.response.body = true;
    } catch (err) {
        console.log(err);
        ctx.response.body = err;
    }
    await next()
})

teacher.get('/deans', async (ctx, next) => {
    try {
        let deans = await queryDeans();
        console.log(deans);
        ctx.response.body = deans.map(item => item.deanno);
    } catch (error) {
        console.log(err);
        ctx.response.body = err;
    }
    await next();
})

teacher.get('/allstudent', async (ctx, next) => {
    try {
        let students = await queryAllStudent();
        console.log(students);
        ctx.response.body = students;
    } catch (error) {
        console.log(error);
        ctx.response.body = error;
    }
    await next();
})

teacher.get('/allteacher', async (ctx, next) => {
    try {
        let teachers = await queryAllTeacher();
        console.log(teachers);
        ctx.response.body = teachers;
    } catch (error) {
        console.log(error);
        ctx.response.body = error;
    }
    await next();
})

teacher.get('/allcourse', async (ctx, next) => {
    try {
        let courses = await queryAllCourse();
        console.log(courses);
        ctx.response.body = courses;
    } catch (error) {
        console.log(error);
        ctx.response.body = error;
    }
    await next();
})

module.exports = teacher