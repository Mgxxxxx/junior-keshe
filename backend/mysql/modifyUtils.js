const db = require("./index")

function sAddCourse(cno, sno) {
    return new Promise(resolve => {
        db.query(`INSERT INTO student_course (\`cno\`, \`sno\`) VALUES (${cno}, ${sno});`)
            .then(res => { resolve(res); })
    })
}

function sDelCourse(cno, sno) {
    return new Promise(resolve => {
        db.query(`DELETE FROM student_course WHERE (sno = ${sno}) and (cno = ${cno});`)
            .then(res => { resolve(res); })
    })
}

function setGrade(sno, cno, grade) {
    return new Promise(resolve => {
        db.query(`UPDATE student_course SET grade=${grade} WHERE sno=${sno} and cno=${cno};`)
            .then(res => { resolve(res); })
    })
}

module.exports = {
    sAddCourse,
    sDelCourse,
    setGrade
}