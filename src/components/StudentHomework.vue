<template>
    <div>
        <StudentHome></StudentHome>
        <el-card v-for="home in homework" :key="home.homeworkID" class="box-card">
            <div slot="header" class="clearfix">
                <span>{{ home.teacherName }}</span>

            </div>
            <span style="float: right">{{ home.timeUpdatedAt}}</span>
            <!--            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            <div class="text">
                {{home.content}}
            </div>
            <UploadHomework :homeworkID="home.homeworkID"></UploadHomework>
        </el-card>
    </div>
</template>

<script>
    import StudentHome from "@/components/StudentHome";
    import * as vm from "vm";
    import UploadHomework from "@/components/UploadHomework";
    export default {
        name: "StudentHomework",
        components: {UploadHomework, StudentHome},
        data : function () {
            return {
                user : {
                    sessionId: "",
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: ""
                },
                homework :[],

                userID: -1,
            }
        },
        methods : {
            getHomework() {
                this.$axios
                .get('/api/getHomework/')
                .then((response) => {
                    // console.log(response)
                    // console.log(response.data)
                    this.homework = response.data;
                })
                .catch((error) => {
                    console.log(error)
                    if(error.response.status===401) {
                        this.$router.push({name: 'Login', query: {redirect: '/studentHomework'}});
                        this.$message.info("请先登录")
                    } else
                        this.$message.error("网络错误")
                })
            },

        },
        created() {
            // this.user = this.$store.state.user;
            this.user = JSON.parse(localStorage.getItem("user"))
            console.log(this.user)
            this.userID = this.user.id
            this.getHomework();
            console.log(this.homework)
            // this.uploadFile.userID = this.user.id;
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
        margin: 20px;
    }

    .item {
        margin-bottom: auto;
    }

    .clearfix{
        display: flex;
        /*justify-content: center;*/
        align-items: center;
    }
    .clearfix:before,
    .clearfix:after {

        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        /*width: 480px;*/
        width: 50vw;
        /*margin: 50px;*/
        margin-left: 25vw;
        margin-top: 5vh;
    }
</style>
