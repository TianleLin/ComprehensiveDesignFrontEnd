<template>
  <div>
      <TeacherHome></TeacherHome>
      <el-card class="box-card">
          <el-avatar :src="'http://1.14.63.16:8080' + user.avatar"></el-avatar>
      <el-container>
      <el-descriptions title="个人资料">
        <el-descriptions-item label="用户名">{{user.username}}</el-descriptions-item>
        <el-descriptions-item label="账号">{{user.id}}</el-descriptions-item>
      </el-descriptions>
      </el-container>
<!--        <el-divider></el-divider>-->
<!--        <el-link type="default" >我的消息<i class="el-icon-receiving el-icon&#45;&#45;right"></i> </el-link>-->
<!--        <el-divider></el-divider>-->
        <el-link type="default" @click="changePassword">更改密码<i class="el-icon-setting el-icon--right" ></i></el-link>
        <el-divider></el-divider>
        <el-link type="default" @click="changeAvatar">更改头像<i class="el-icon-setting el-icon--right" ></i></el-link>
        <el-divider></el-divider>
        <el-link type="default" @click="logOut">退出<i class="el-icon-more-outline el-icon--right" ></i></el-link>
        <el-divider></el-divider>

        <uploadPic :dialogVisible="this.dialogVisible" @refresh='bindShow'></uploadPic>
      </el-card>
  </div>
</template>

<script>
// import uploadPic from "@/components/UploadPic";
// import pic from "@/components/Pic";
import TeacherHome from "@/components/TeacherHome";
export default {
    components: {TeacherHome},
    watch :{
        change(){
        let src = this.circleUrl;
        this.circleUrl = ""
        this.visible = false
        this.$nextTick(() => {
            this.circleUrl = src;
            this.visible=true;
        })
        console.log('changePic');
        }
    },
  data () {
    return {
      user : {
      id:0,
      username:"",
      password:"",
      avatar:"",
      teacher:false,
    },
      dialogVisible: false,
      visible: true,
      change:'0',
    }
  },
  created(){
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
  },

  methods:{
    //子组件通信
    bindShow(data){
        this.dialogVisible=data;
        this.change++;
    },
    //登出
      logOut() {

          // this.$router.push('/');
          // console.log(this.$store.state.user)
          this.$axios
              .post("/api/logout", null)
              .then((response) => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("isLogin")
                  // console.log(response)
                  this.$message.success("Logout")
                  this.$router.push({path:'/login'})
              })
              .catch((error) => {
                  // console.log(error.response)
                  this.$message.error("Error")
              })
      },
    //改密码
    changePassword(){
        this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
         this.$axios
          .post("/api/updatePassword", null, {
            params: {
              newPassword:value,
              oldPassword:this.user.password,
              username: this.user.username,
            },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              console.log(response.data);
              this.$message.success("修改成功!");
            }
          })
          .catch((failResponse) => {
            console.log("fail");
            console.log(failResponse.data);
          });
        }).catch(() => {});
    },
    //改头像
    changeAvatar(){
        this.dialogVisible=true;
        //刷新
        this.visible=false;

    },
  },
    props:[
        "teacher",
    ]

}
</script>

<style scoped>
    .box-card {
        /*width: 480px;*/
        width: 50vw;
        /*margin: 50px;*/
        margin-left: 25vw;
        margin-top: 5vh;
    }
</style>
