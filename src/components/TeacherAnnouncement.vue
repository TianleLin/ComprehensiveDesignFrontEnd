<template>
    <div>
        <TeacherHome></TeacherHome>
        <div class="box-card">
        <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入公告"
                v-model="textarea"
        >
        </el-input>
        <el-button type="primary" @click="createHomework">提交</el-button>
        </div>
        <Announcement v-if="showAnnouncement" :teacher="true" ></Announcement>

    </div>
</template>

<script>
    import TeacherHome from "@/components/TeacherHome";
    import Announcement from "@/components/Announcement";
    export default {
        components: {Announcement, TeacherHome},
        data() {
            return {
                textarea: '',
                user : {
                    sessionId: "",
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: ""
                },
                showAnnouncement: true,
            }
        },
        methods:{
            async createHomework() {
                await this.$axios
                    .post('/api/createAnnouncement', null, {
                        params:{
                            content: this.textarea,
                            userID : this.user.id,
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        this.input=''
                        this.showAnnouncement = false
                        this.$nextTick(() => {
                            this.showAnnouncement = true
                        })
                        this.$message.success("发送成功")
                        this.textarea=''
                    })
                    .catch((error) => {
                        console.log(error)
                        this.$message.error("网络错误")
                    })
            },
            refresh(){
                this.showAnnouncement = false
                this.$nextTick(() => {
                    this.showAnnouncement = true
                })
            }
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("user"))
    },
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
