<template>
    <el-card>
        <div v-if="fileType == 'video'">
            <video width="100%" controls>
                <source :src="fileURL" type="video/mp4">
            </video>
        </div>
        <div v-else-if="fileType == 'pdf'">
            <embed :src="fileURL" width="100%" height="100%" />
        </div>
        <div v-else-if="fileType == 'slide'">
            <iframe :src='pptxPluginURL' width="100%" height="100%" />
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
