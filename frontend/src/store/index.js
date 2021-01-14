import Vue from "vue"
import Vuex from "vuex"
import { saddcourse, sdelcourse } from "@/api"

Vue.use(Vuex)

const opt = {
    state: {
        logined: false,
        role: null,
        userInfo: null,
        courses: [],
        noSelectCourses: null,
        teaGroupInfo: null,
        leadClass: null,
        teaCourse: null
    },
    getters: {
        getLoginStatu(state) {
            return state.logined;
        },
        getRole(state) {
            return state.role;
        },
        getUserInfo(state) {
            return state.userInfo;
        },
        getCourses(state) {
            return state.courses;
        },
        getNoSelectCourses(state) {
            return state.noSelectCourses;
        },
        getTeaGroupInfo(state) {
            return state.teaGroupInfo;
        },
        getLeadClass(state) {
            return state.leadClass;
        },
        getTeaCourse(state) {
            return state.teaCourse;
        }
    },
    mutations: {
        setLoginStatu(state, statu) {
            state.logined = statu;
        },
        setRole(state, role) {
            state.role = role;
        },
        setUerInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setCourses(state, courses) {
            state.courses = courses;
        },
        sAddCourse(state, cno) {
            // console.log(course);
            state.courses.some((item, i) => {
                if (item.cno === cno) {
                    if (state.courses[i].grade === undefined) state.courses[i].grade = 0;
                    state.courses[i].state = true;
                    return true;
                }
            })
            state.courses.push('');
            state.courses.pop();
        },
        sDelCourse(state, cno) {
            // console.log(cno);
            state.courses.some((item, i) => {
                if (item.cno === cno) {
                    state.courses[i].state = false;
                    return true;
                }
            })
            state.courses.push('');
            state.courses.pop();
        },
        setTeaGroupInfo(state, info) {
            state.teaGroupInfo = info;
        },
        setLeadClass(state, classes) {
            state.leadClass = classes;
        },
        setTeaCourse(state, course) {
            state.teaCourse = course;
        }
    },
    actions: {
        sAddCourseAsync({ commit }, { cno, sno, _time }) {
            saddcourse(cno, sno, _time).then(res => {
                console.log(res);
                commit('sAddCourse', cno);
            }).catch(err => {
                console.log(err);
            })
        },
        sDelCourseAsync({ commit }, { cno, sno }) {
            sdelcourse(cno, sno).then(res => {
                console.log(res);
                commit('sDelCourse', cno);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}

export default new Vuex.Store(opt)