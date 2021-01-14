import axios from "../utils/axios"

export function login(userno, pwd, role) {
    return axios.post('/login', { userno, pwd, role });
}

export function courses(account) {
    return axios.get('/student', {
        params: { account }
    });
}

export function coursesy(account) {
    return axios.get('/student/coursesy', {
        params: { account }
    });
}

export function saddcourse(cno, sno, time) {
    return axios.post('/student/addcourse', { cno, sno, time });
}

export function sdelcourse(cno, sno) {
    return axios.post('/student/delcourse', { cno, sno });
}

export function tea_group_info(account) {
    return axios.get('/teacher', {
        params: { account }
    });
}

export function tea_course(account) {
    return axios.get('/teacher/teacourse', {
        params: { account }
    });
}

export function stu_grade(account) {
    return axios.get('/teacher/stugrade', {
        params: { account }
    });
}

export function set_grade(sno, cno, grade) {
    return axios.post('/teacher/setgrade', { sno, cno, grade })
}

export function deans() {
    return axios.get('/teacher/deans')
}

export function all_student() {
    return axios.get('/teacher/allstudent')
}

export function all_teacher() {
    return axios.get('/teacher/allteacher')
}

export function all_course() {
    return axios.get('/teacher/allcourse')
}
