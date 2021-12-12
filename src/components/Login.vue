<template>
  <div class="login">
    <el-card>
      <h2>登录</h2>
        <el-form
            :model="loginForm"
            :rules="rules"
            status-icon
            >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" placeholder="学号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
        <router-link to="/forget">忘记密码</router-link> |
        <router-link to="/register">注册</router-link>
    </el-card>
  </div>
</template>

<script>
    import Vue from "vue";
    import router from "vue-router";
export default {
  name: "Login",
  data () {
    return {
        user : {
            sessionId: "",
            avatar: "",
            id: 0,
            password: "",
            teacher: false,
            username: "",
        },
      loginForm: {
        username : "",
        password : ""
      },
        rules: {
            username: [
                {
                    required: true,
                    message: "Username is required",
                    trigger: "blur"
                },
            ],
            password: [
                { required: true, message: "Password is required", trigger: "blur" },
            ]
        }
    }
  },
  methods:{
    login() {
      this.$axios
      .post("/api/login", null, {
          params: {
              "username":this.loginForm.username,
              "password":this.loginForm.password
          }
      })
      .then((response) => {
        console.log(response)
          if(response.status==200) {
              // console.log(response)
              // console.log(response.data)
              this.$store.commit("userLogin", response.data)
              // localStorage.setItem("isLogin", "true");
              localStorage.setItem("user", JSON.stringify(response.data))
              let user = localStorage.getItem("user")
              console.log(JSON.parse(user))
              if (response.data.teacher === true) {
                  this.$message.success("管理员登陆成功！")
                  this.$router.push(this.$route.query.redirect || '/teacherCourse')

                  // this.$router.replace({path: '/teacherCourse'})
              } else {
                  this.$message.success("学生登陆成功！")
                  // this.$router.replace({path: '/course'})
                  this.$router.push(this.$route.query.redirect || '/studentCourse')

              }
              // console.log(this.$route.query.redirect)
          }
      })
      .catch((error) => {
        console.log(error)
          console.log(error.response)
          if (error.response.status === 403) {
              this.$message.error("密码错误！")
          } else if (error.response.status === 404) {
              this.$message.error("用户不存在！")
          } else if(error.response.status === 500){
              this.$message.error("系统错误！")
          }else if (error.response.status === 400) {
              this.$message.error("用户不能为空")
          }  else {
              this.$message.error('失败！')
          }
      })
    },
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
    margin-top: 10vh;
}

</style>

