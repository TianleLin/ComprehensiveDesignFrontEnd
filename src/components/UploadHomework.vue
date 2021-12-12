<template>
    <el-upload
            action=""
            :http-request="customRequest"
            ref="upload"
            drag
            :limit="1"
            :auto-upload="true"
            class="upload-demo"
    >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处</div>
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">文件不超过10mb</div>
    </el-upload>
</template>

<script>
    export default {
        name: "UploadHomework",
        data : function () {
            return{
                user : {
                    sessionId: "",
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: ""
                },
                fileList: [],
            }
        },
        methods: {
            customRequest(params) {
                let formData = new FormData();
                formData.append('homeworkFile', params.file);
                formData.append('homeworkID', this.homeworkID);
                formData.append('userID', this.user.id);
                this.uploadDialogVisible = true;
                this.$axios
                .post('/api/uploadHomework', formData)
                    .then((response) => {
                        console.log(response)
                    this.$message.success("Upload Successfully")
                })
                .catch((error) => {
                    console.log(error)
                    this.$message.error("Fail")
                })
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
        },
        props:[
            "homeworkID",
        ],
        created() {
            // this.user = this.$store.state.user;
            this.user = JSON.parse(localStorage.getItem("user"))
            console.log(this.user)
            this.userID = this.user.id
        }
    }
</script>

<style scoped>

</style>
