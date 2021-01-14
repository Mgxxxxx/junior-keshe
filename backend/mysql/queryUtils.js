const db = require("./index")

function queryUser(account, pwd, role) {
    return new Promise(resolve => {
        let no = role === 'Student' ? 'sno' : 'tno';
        let table = role === 'Student' ? 'student' : 'teacher';
        db.query(`select * from ${table} where ${no}=${account} and pwd='${pwd}'`)
            .then(res => { resolve(res); })
    })
}

function queryUserInfo(account, role) {
    return new Promise(resolve => {
        let no = role === 'Student' ? 'sno' : 'tno';
        let table = role === 'Student' ? 'student' : 'teacher';
        db.query(`select * from ${table} where ${no}=${account}`)
            .then(res => { resolve(res); })
    })
}

function queryStudentCourses(account) {
    return new Promise(resolve => {
        // db.query(`SELECT c.cno,cname,grade,course_time FROM student_course sc,course c where sc.cno=c.cno and sno=${account};`)
        //     .then(res => { resolve(res); })
        db.query(`SELECT cc.cno,t1.cname,_time,t1.grade FROM
                (SELECT sc.sno,c.cno cno,cname,grade FROM student_course sc,course c where sc.cno=c.cno and sno=${account}) t1,
                class_course cc
                where clno=(SELECT clno FROM student s where sno=${account}) and cc.cno in (t1.cno);`)
            .then(res => { resolve(res); })
    })
}

function queryStudentNoSeletCourse(account) {
    return new Promise(resolve => {
        // db.query(`SELECT cno,cname FROM course where cno not in(SELECT c.cno FROM student_course sc,course c where sc.cno=c.cno and sno=${account});`)
        //     .then(res => { resolve(res); })
        db.query(`SELECT cc.cno,t1.cname,_time FROM
                (SELECT cno,cname FROM course where cno not in(SELECT c.cno FROM student_course sc,course c where sc.cno=c.cno and sno=${account})) t1,
                class_course cc
                where clno=(SELECT clno FROM student s where sno=${account}) and cc.cno in (t1.cno);`)
            .then(res => { resolve(res); })
    })
}

function queryTeaGroup(account) {
    return new Promise(resolve => {
        db.query(`SELECT tno,t1.cgno,t2.headerno,cname
                FROM t_cg_course t1, course_group t2,course c
                where t1.tno=${account} and t1.cgno=t2.cgno and c.cno in (t1.cgno);`)
            .then(res => { resolve(res); })
    })
}

function queryTeaWithClass(account) {
    return new Promise(resolve => {
        db.query(`SELECT clno,headerno,tname FROM class c,teacher t where c.headerno=t.tno=${account};`)
            .then(res => { resolve(res); })
    })
}

function queryTeaCourse(account) {
    return new Promise(resolve => {
        db.query(`SELECT c.cno,cname,_time FROM teacher_course tc,course c where tno=${account} and tc.cno=c.cno;`)
            .then(res => { resolve(res); })
    })
}

function queryStuGrade(account) {
    return new Promise(resolve => {
        db.query(`SELECT distinct s.sno,s.sname,t1.cno,t2.cname,t1.grade FROM
            (SELECT t1.sno sno,cc.cno cno,t1.cname,_time,t1.grade grade FROM
			(SELECT sc.sno sno,c.cno cno,cname,grade FROM student_course sc,course c where sc.cno=c.cno) t1,
			class_course cc
			where cc.cno in (t1.cno)) t1,
            (SELECT c.cno cno,cname,_time FROM teacher_course tc,course c where tno=${account} and tc.cno=c.cno) t2,
            student s
            where t1.cno=t2.cno and t1._time=t2._time and t1.sno=s.sno;`)
            .then(res => { resolve(res); })
    })
}

function queryDeans() {
    return new Promise(resolve => {
        db.query(`SELECT deanno FROM dean d;`)
            .then(res => { resolve(res); })
    })
}

function queryAllStudent() {
    return new Promise(resolve => {
        db.query(`SELECT sno,sname,sex,clno FROM test.student;`)
            .then(res => { resolve(res); })
    })
}

function queryAllTeacher() {
    return new Promise(resolve => {
        db.query(`SELECT tno,tname,sex FROM teacher;`)
            .then(res => { resolve(res); })
    })
}

function queryAllCourse() {
    return new Promise(resolve => {
        db.query(`SELECT * FROM test.course;`)
            .then(res => { resolve(res); })
    })
}

module.exports = {
    queryUser,
    queryUserInfo,
    queryStudentCourses,
    queryStudentNoSeletCourse,
    queryTeaGroup,
    queryTeaWithClass,
    queryTeaCourse,
    queryStuGrade,
    queryDeans,
    queryAllStudent,
    queryAllTeacher,
    queryAllCourse
}