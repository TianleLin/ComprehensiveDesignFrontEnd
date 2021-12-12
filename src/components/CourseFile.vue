<template>
    <el-card>
        <div v-if="fileType == 'video'">
            <video width="1280" height="720" controls>
                <source :src="fileURL" type="video/mp4">
            </video>
        </div>
        <div v-else-if="fileType == 'pdf'">
            <embed :src="fileURL" width="1280" height="1920" />
        </div>
        <div v-else-if="fileType == 'slide'">
            <iframe :src='pptxPluginURL' width='1280' height="720" />
        </div>
        <div v-else>
            <span>File Not Support</span>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "CourseFile",
        data: function () {
            return {
                user : {
                    sessionId: "",
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: ""
                },
                pptxPluginURL : "//docs.google.com/gview?url=",
            }
        },
        created() {
            this.user = JSON.parse(localStorage.getItem("user"))
            // this.user = this.$store.state.user;
            this.pptxPluginURL = this.pptxPluginURL + this.fileURL + '&embedded=true';
            console.log(this.pptxPluginURL)

        },
        props : [
            "fileURL",
            "fileType",
        ]
    }
</script>

<style scoped>
.el-card {
    margin-right: 50px;
}
</style>
