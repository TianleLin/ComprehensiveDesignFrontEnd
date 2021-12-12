import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // 设置属性
  state: {
    isLogin: false,
    user : {
      id:0,
      username:"",
      password:"",
      avatar:"",
      teacher:false,
    },
    showInputID:0,
    showInput:false,
    threeLevelMenuID: 0,
    refreshFlag:1,
  },

  // 获取属性的状态
  // getters: {
  //   //获取登录状态
  //   // isLogin: state => state.isLogin,
  //   user: state => state.user,
  // },

  // 设置属性状态
  mutations: {
    //保存登录状态
    // userStatus(state, flag) {
    //   state.user = flag
    // },
    userLogin(state, user) {
      state.user = user;
      state.isLogin = true;
    },
    setShowInputID(state, id) {
      state.showInputID = id
    },
    setShowInput(state, value){
      state.showInput = value
    },
    setThreeLevelMenuID(state, value){
      state.threeLevelMenuID = value
    },
    setRefresh(state) {
      state.refreshFlag+=1
    }
  },

  // 应用mutations
  // actions: {
  //   //获取登录状态
  //   userLogin({commit}, flag) {
  //     commit("userStatus", flag)
  //   },
  // },
  modules: {},
});
