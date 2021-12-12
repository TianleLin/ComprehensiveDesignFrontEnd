<template>
    <div class="register">
        <el-card>
            <h2>注册</h2>
            <el-form
                    :model="registerForm"
                    :rules="rules"
                    status-icon
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="registerForm.username" placeholder="学号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registerForm.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">
                        注册
                    </el-button>
                </el-form-item>
            </el-form>
            <router-link to="/forget">忘记密码</router-link> |
            <router-link to="/login">登录</router-link>
        </el-card>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        name: "Register",
        data () {
            return {
                user : {
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: ""
                },
                registerForm: {
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
            register() {
                this.$axios
                    .post("/api/register", null, {
                        params: {
                            "username":this.registerForm.username,
                            "password":this.registerForm.password
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        if(response.status==201) {
                            this.$message({
                                message: '成功！',
                                type: 'success'
                            })
                            this.$router.push({path:'/login'})
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        if(error.response == 400){
                            this.$message.error('不能为空')
                        } else if(error.response == 208){
                            this.$message.error('用户已存在')
                        } else if(error.response == 208){
                            this.$message.error('用户已存在')
                        }else
                            this.$message.error('失败！')
                    })
            },

    }
    }
</script>

<style scoped>
    .register {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10vh;
    }

</style>
