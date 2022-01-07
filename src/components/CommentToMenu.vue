<template>
    <div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="sendComment">提交</el-button>
    </div>
</template>

<script>
    export default {
        name: "CommentToMenu",
        data:function (){
            return {
                input:'',
                user : {
                    sessionId: "",
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: ""
                },
            }
        },
        methods:{
            async sendComment() {
                // console.log(this.threeLevelMenuID)
                await this.$axios
                    .post('/api/sendComment', null, {
                        params:{
                            content: this.input,
                            threeLevelMenuID: this.threeLevelMenuID,
                            userID : this.user.id,
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        this.$store.commit('setRefresh')
                        this.input=''
                        this.$message.success("发送成功")
                    })
                    .catch((error) => {
                        console.log(error)
                        this.$message.error("网络错误")
                    })
            }
        },
        props:[
            "threeLevelMenuID",
        ],
        created() {
            this.user = JSON.parse(localStorage.getItem("user"))
        }
    }
</script>

<style scoped>

</style>
