import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login";
import Register from "@/components/Register";
import StudentHomework from "@/components/StudentHomework";
import StudentCourse from "@/components/StudentCourse";
import StudentAnnouncement from "@/components/StudentAnnouncement";
import TeacherCourse from "@/components/TeacherCourse";
import TeacherHomeWork from "@/components/TeacherHomework";
import TeacherAnnouncement from "@/components/TeacherAnnouncement";
import TeacherProfile from "@/components/TeacherProfile";
import StudentProfile from "@/components/StudentProfile";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect : Login,
    // meta: { isLogin: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      // isLogin : false,
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      // isLogin : false,
    }
  },
  {
    path: '/studentProfile',
    name: "StudentProfile",
    component: StudentProfile,
    meta: {
      // isLogin : true
    }
  },
  {
    path: '/studentHomework',
    name: "StudentHomework",
    component: StudentHomework,
    meta: {
      // isLogin : true
    }
  },
  {
    path: '/studentCourse',
    name: "StudentCourse",
    component: StudentCourse,
  },
  {
    path: '/studentAnnouncement',
    name: 'StudentAnnouncement',
    component: StudentAnnouncement,
  },
  {
    path: '/teacherCourse',
    name: "TeacherCourse",
    component: TeacherCourse,
  },
  {
    path: '/teacherHomework',
    name: "TeacherHomework",
    component: TeacherHomeWork,
  },
  {
    path: '/teacherAnnouncement',
    name: "TeacherAnnouncement",
    component: TeacherAnnouncement,
  },
  {
    path: '/teacherProfile',
    name: "TeacherProfile",
    component: TeacherProfile,
    meta: {
      // isLogin : true
    }
  },
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  // base:'ComprehensiveDesignFrontEnd',
  routes,
});


export default router;
