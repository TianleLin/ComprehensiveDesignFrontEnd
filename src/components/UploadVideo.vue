<template>
  <el-dialog
    title="文件上传"
    :visible.sync="visible"
    :close-on-click-modal="true"
    :modal="true"
    :show-close="true"
    :center="true"
    style="text-align: center"
  >
    <el-upload
      :http-request="customRequest"
      ref="upload"
      drag
      :limit="1"
      action=""
      :auto-upload="true"
      class="upload-demo"
      style="text-align: center"

    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处</div>
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">文件不超过10mb</div>
    </el-upload>
  </el-dialog>
</template>

<script>
export default {
  name: "UploadVideo",
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
      fileType:"video",
      fileList: [],
      visible: false,
    };
  },
  methods: {
    customRequest(params) {
      let formData = new FormData();
                formData.append('file', params.file);
                formData.append('fileType', this.fileType);
                formData.append('parentID', this.parentID);
                formData.append('title', this.title);
                formData.append('userID', this.user.id);
                this.uploadDialogVisible = true;
                this.$axios
                .post('/api/createThreeLevelMenu', formData)
                    .then((response) => {
                        console.log(response)
                    this.$message.success("上传成功")
                })
                .catch((error) => {
                    console.log(error)
                    this.$message.error("Fail")
                })

    },
  },
  props: ['parentID','title','dialogVisible'],
  watch:{
      dialogVisible(){
        this.visible=this.dialogVisible;
      },
      visible(){
        this.$emit('refresh',this.visible);
      }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    this.userID = this.user.id;
  },
};
</script>

<style scoped>
.el-dialog--center .el-dialog__body{
  text-align: center;
}
</style>

