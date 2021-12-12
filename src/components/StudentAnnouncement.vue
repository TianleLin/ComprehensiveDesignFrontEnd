<template>
    <div>
        <StudentHome></StudentHome>
        <Announcement :teacher="false"></Announcement>
    </div>
</template>

<script>
    import StudentHome from "@/components/StudentHome";
    import Announcement from "@/components/Announcement";
    export default {
        name: "StudentAnnouncement",
        components: {Announcement, StudentHome},
        data: function (){
            return {
                announcements : [],
                user : {
                    sessionId: "",
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: ""
                }

            }
        },
        methods: {
            async getAnnouncement () {
                await this.$axios
                .get('/api/getAnnouncement')
                .then((response) => {
                    console.log(response)
                    this.announcements = response.data
                    console.log(this.announcements)
                })
                .then((error) => {
                    console.log(error)
                    if(error.response.status===401) {
                        this.$router.push({name: 'Login', query: {redirect: '/studentAnnouncement'}});
                        this.$message.info("请先登录")
                    } else
                        this.$message.error("网络错误")
                })
            }
        },
        created() {
            this.getAnnouncement();
            this.user = this.$store.state.user;

        },
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
    .avatar {
        margin: 10px;
    }
</style>
