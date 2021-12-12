<template>
    <el-menu mode="horizontal" @select="handleSelect" router :default-active="activeIndex">
        <el-menu-item index="/teacherProfile">
                <el-avatar :src="avatarURL"></el-avatar>
        </el-menu-item>
        <el-menu-item index="/teacherCourse">Course</el-menu-item>
        <el-menu-item index="/teacherHomework">Homework</el-menu-item>
        <el-menu-item index="/teacherAnnouncement">Announcement</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "TeacherHome",
        components: {},
        data: function () {
            return {
                baseURL : 'http://1.14.63.16:8080',
                avatarURL : '',
                user : {
                    sessionId: "",
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: ""
                },
                activeIndex : 'teacherCourse'
            }
        },
        methods: {
            getURL(){
                var url = this.$route.path;
                var arr = url.split('/')
                this.activeIndex = '/' + arr[1]
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.activeIndex = key;
                console.log(this.activeIndex)
            },
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
            test() {
                this.$axios
                    .post("/api/testSession", null)
                    .then((response) => {
                        // console.log(response)
                        // console.log(response.data)
                        if(response.status==200) {
                            this.$message.success("Session exist!")
                        }
                    })
                    .catch((error) => {
                        // console.log(error)
                        console.log(error.response)
                        if(error.response.status===401) {
                            this.$router.push({ name: 'Login', query: { redirect: '/teacherCourse' } });
                            this.$message.info("Please Login")
                        } else
                            this.$message.error('失败！')
                    })
            },
            click() {
                this.$message.success(" ")
            },
            toProfile() {
                this.$router.push({path: '/profile'})
            }
        },
        created() {
            this.user = JSON.parse(localStorage.getItem("user"))
            // this.user = this.$store.state.user;
            this.avatarURL = this.baseURL + this.user.avatar;
            this.getURL()
        }
    }
</script>

<style scoped>
    .el-menu {
        margin: 50px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
