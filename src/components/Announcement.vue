<template>
    <div>
    <el-card v-for="announcement in announcements" :key="announcement.announcementID" class="box-card">
        <div slot="header" class="clearfix">
            <span>{{ announcement.username }}</span>
        </div>
        <span style="float: right">{{ announcement.timeUpdatedAt}}</span>
        <div v-show="editID != announcement.announcementID" class="text">
            {{announcement.content}}
        </div>
        <el-input
                type="textarea"
                :rows="5"
                :placeholder="announcement.content"
                v-model="textarea"
                v-show="teacher && editID == announcement.announcementID && !editFlag"
        >
        </el-input>
        <el-button
                v-show="teacher && editID != announcement.announcementID" type="primary"
                @click="deleteAnnouncement(announcement.announcementID)">删除</el-button>
        <el-button
                v-show="teacher && editID != announcement.announcementID" type="primary"
                @click="enterEditAnnouncement(announcement.announcementID)">修改</el-button>
        <el-button
                v-show="teacher && editID == announcement.announcementID && !editFlag" type="primary"
                @click="editAnnouncement(announcement.announcementID)">确定</el-button>
        <el-button
                v-show="teacher && editID == announcement.announcementID && !editFlag" type="primary"
                @click="leaveEditAnnouncement(announcement.announcementID)">取消</el-button>
    </el-card>
    </div>
</template>

<script>
    export default {
        name: "Announcement",
        data: function (){
            return{
                announcements : [],
                user : {
                    sessionId: "",
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: ""
                },
                editFlag: true,
                editID: 0,
                textarea:'',
            }
        },
        methods : {
            async deleteAnnouncement (id) {
                await this.$axios
                .post('/api/deleteAnnouncement', null, {
                    params:{
                        announcementID: id,
                        userID: this.user.id,
                    }
                })
                .then((response) => {
                    console.log(response)
                    this.$parent.refresh()
                    this.$message.success("Success")
                })
                .catch((error) => {
                    console.log(error.response)
                    this.$message.error("Fail")
                })
            },
            enterEditAnnouncement(id){
                this.editID = id
                this.editFlag = false
            },
            leaveEditAnnouncement(){
                this.editID = 0
                this.editFlag = true
                this.textarea=''
            },
            async editAnnouncement (id) {
                await this.$axios
                    .post('/api/editAnnouncement', null, {
                        params:{
                            content: this.textarea,
                            announcementID: id,
                            userID: this.user.id,
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        this.$parent.refresh()
                        this.$message.success("Success")
                    })
                    .catch((error) => {
                        console.log(error.response)
                        this.$message.error("Fail")
                    })
            },
            async getAnnouncement () {
                await this.$axios
                    .get('/api/getAnnouncement')
                    .then((response) => {
                        console.log(response)
                        this.announcements = response.data.reverse()
                    })
                    .catch((error) => {
                        console.log(error)
                        if(error.response.status===401) {
                            if(this.teacher){
                                this.$router.push({name: 'Login', query: {redirect: '/teacherAnnouncement'}});
                                this.$message.info("请先登录")
                            } else {
                                this.$router.push({name: 'Login', query: {redirect: '/studentAnnouncement'}});
                                this.$message.info("请先登录")
                            }
                        } else
                            this.$message.error("网络错误")
                    })
            }
        },
        created() {
            this.user = JSON.parse(localStorage.getItem("user"))
            this.getAnnouncement()
        },
        props:[
            "teacher",
        ]
    }
</script>

<style scoped>
    .text {
        white-space: pre-wrap;
        font-size: 14px;
        margin: 20px;
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
