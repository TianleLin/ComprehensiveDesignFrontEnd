<template>
    <div>
        <TeacherHome></TeacherHome>
        <div class="box-card">
            <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入新作业内容"
                    v-model="content2"
            >
            </el-input>
            <el-button type="primary" @click="createHomework">
                提交
            </el-button>
        </div>
        <el-card v-for="home in homework" :key="home.homeworkID" class="box-card">
            <div slot="header" class="clearfix">
                <span>{{ home.teacherName }}</span>
                <el-button
                        size="mini"
                        type="text"
                        @click="deleteHomework(home.homeworkID)"
                >
                    删除作业
                </el-button>
            </div>
            <span style="float: right">{{ home.timeUpdatedAt }}</span>
            <!--            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            <div class="text"  v-show="editID != home.homeworkID">
                {{ home.content }}
            </div>
            <el-input
                    type="textarea"
                    :rows="2"
                    :placeholder="home.content"
                    v-model="content"
                    v-show="editID == home.homeworkID && !editFlag"
            >
            </el-input>
            <el-button
                    v-show="editID != home.homeworkID" type="primary"
                    @click="enterEdit(home.homeworkID)">修改</el-button>
            <el-button
                    v-show="editID == home.homeworkID && !editFlag" type="primary"
                    @click="editHomework(home.homeworkID)">确定</el-button>
            <el-button
                    v-show="editID == home.homeworkID && !editFlag" type="primary"
                    @click="leaveEdit(home.homeworkID)">取消</el-button>
        </el-card>
    </div>
</template>

<script>
    import TeacherHome from "@/components/TeacherHome";
    export default {
        name: "Homework",
        components: {TeacherHome},
        data: function () {
            return {
                user: {
                    sessionId: "",
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: "",
                },
                editID:0,
                editFlag:true,
                homework: [],
                change: 0,
                userID: -1,
                dialogname: "",
                content: "",
                content2:'',
            };
        },
        watch: {
            change() {
                console.log("changed!-------");
                this.getHomework();
                console.log(this.homework);
            },
        },

        methods: {
            bindShow(data) {
                this.dialogVisible = data;
            },
            enterEdit(homeworkId){
                this.editID=homeworkId;
                this.editFlag=false;
            },
            leaveEdit(homewrokId){
                this.editID=0;
                this.editFlag=true;
                this.content='';
            },
            //获取作业信息
            getHomework(data) {
                this.$axios
                    .get("/api/getHomework/")
                    .then((response) => {
                        // console.log(response)
                        // console.log(response.data)
                        this.homework = response.data.reverse();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                console.log(data);
            },
            //更改作业内容
            editHomework(homeworkID) {
                this.$axios
                    .post("/api/editHomework", null, {
                        params: {
                            content: this.content,
                            homeworkID: homeworkID,
                            userID: this.user.id,
                        },
                    })
                    .then((response) => {
                        console.log(response);
                        if (response.status == 200) {
                            console.log(response.data);
                            this.$message.success("修改成功!");
                            //标记已修改
                            this.change++;
                            this.editID=0;
                            this.editFlag=true;
                            this.content='';

                        }
                    })
                    .catch((failResponse) => {
                        console.log("fail");
                        console.log(failResponse.data);
                    });
            },
            //删除作业
            deleteHomework(homeworkID) {
                this.$axios
                    .post("/api/deleteHomework", null, {
                        params: {
                            homeworkID: homeworkID,
                            userID: this.user.id,
                        },
                    })
                    .then((response) => {
                        console.log(response);
                        if (response.status == 200) {
                            console.log(response.data);
                            this.$message.success("删除成功!");
                            //标记已修改
                            this.change++;
                        }
                    })
                    .catch((failResponse) => {
                        console.log("fail");
                        console.log(failResponse.data);
                    });
            },
            //新建作业
            createHomework() {
                this.$axios
                    .post("/api/createHomework", null, {
                        params: {
                            content: this.content2,
                            userID: this.user.id,
                        },
                    })
                    .then((response) => {
                        console.log(response);
                        if (response.status == 200) {
                            console.log(response.data);
                            this.$message.success("删除成功!");
                            //标记已修改
                            this.change++;
                            this.content2='';
                        }
                    })
                    .catch((failResponse) => {
                        console.log("fail");
                        console.log(failResponse.data);
                    });
            },
        },

        created() {
            // this.user = this.$store.state.user;
            this.user = JSON.parse(localStorage.getItem("user"));
            console.log(this.user);
            this.userID = this.user.id;
            this.getHomework();
            console.log(this.homework);
            // this.uploadFile.userID = this.user.id;
        },
    };
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
