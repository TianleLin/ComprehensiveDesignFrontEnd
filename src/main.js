import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const axios = require('axios');
// axios.defaults.baseURL = 'http://1.14.63.16:8080/api'
// axios.defaults.baseURL = 'http://lintianle.cn:8080/api'

// axios.defaults.baseURL = 'http://localhost:8081/api'
// axios.defaults.baseURL = '/api'
axios.defaults.withCredentials=true;
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false;

Vue.use(ElementUI)

// router.beforeEach((to, from, next) => {
//
//   //获取用户登录成功后储存的登录标志
//   let getFlag = localStorage.getItem("isLogin");
//
//   //如果登录标志存在且为isLogin，即用户已登录
//   if(getFlag === "true"){
//
//     //设置vuex登录状态为已登录
//     store.state.isLogin = true
//     next()
//
//     // //如果已登录，还想想进入登录注册界面，则定向回首页
//     // if (!to.meta.isLogin) {
//     //   //iViewUi友好提示
//     //   ElementUI.Message.error('请先退出登录')
//     //   next({
//     //     path: '/studentHome'
//     //   })
//     // }
//
//     //如果登录标志不存在，即未登录
//   }else{
//
//     //用户想进入需要登录的页面，则定向回登录界面
//     if(to.meta.isLogin){
//       next({
//         path: '/login',
//       })
//       //iViewUi友好提示
//       ElementUI.Message.info('请先登录')
//       //用户进入无需登录的界面，则跳转继续
//     }else{
//       next()
//     }
//
//   }
//
// });
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
