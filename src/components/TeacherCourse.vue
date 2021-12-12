<template>
    <div>
    <TeacherHome></TeacherHome>
        <el-container>
            <el-aside>
                <div style="text-align:left;">
                    <el-button
                            type="primary"
                            @click='appendZJ'
                            style="text-align:left;"
                    >
                        添加课时
                    </el-button>
                    <div class="custom-tree-container">
                        <div class="block">
                            <el-tree
                                    :data="menus"
                                    node-key="id"
                                    default-expand-all
                                    :expand-on-click-node="false"
                                    :render-content="renderContent"
                                    @node-click="handleNodeClick"
                            >
                            </el-tree>
                        </div>
                    </div>
                    <UploadVideo :dialog-visible="dialogVisible" :title="videoTitle" :parent-i-d="videoParentID" @refresh="bindShow"></UploadVideo>
            <!--        <UploadVideo :dialogVisible="this.dialogVisible" :title="this.videoTitle" :parentID="this.videoParentID" @refresh='bindShow'></UploadVideo>-->
                </div>
            </el-aside>
            <el-main>
                <CourseFile :fileType="fileType" :fileURL="'http://1.14.63.16:8080'+fileURL"></CourseFile>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import TeacherHome from "@/components/TeacherHome";
    import UploadVideo from "@/components/UploadVideo";
    import CourseFile from "@/components/CourseFile";
    let id = 1000;
    var vedioID = 1;
    export default {
        name: "TeacherCourse",
        components: {CourseFile, UploadVideo, TeacherHome},
        data() {
            return {
                menus: [
                    {
                        id: 1,
                        title: "目录",
                    },
                ],
                dialogVisible: false,
                input1: "",
                change: 1,
                videoTitle:"",
                videoParentID:"",
                fileURL : '',
                fileType : '',
            };
        },
        watch: {
            change(newVal, oldVal) {
                // 监听 change 属性的数据变化
                // 作用 : 只要值发生变化,这个方法就会被调用,重新从服务器获取新的树
                //获取新树
                this.$axios
                    .get("/api/getAllMenu")
                    .then((response) => {
                        console.log(response);
                        this.menus = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$message.error("Internet Error!");
                    });

                console.log("oldVal:", oldVal);
                console.log("newVal:", newVal);
            },
        },
        //页面初始化
        created() {
            this.user = JSON.parse(localStorage.getItem("user"));
            console.log(this.user.id);
            //获取章节信息树
            this.$axios
                .get("/api/getAllMenu")
                .then((response) => {
                    console.log(response);
                    this.menus = response.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.$message.error("Internet Error!");
                });
        },

        methods: {
            bindShow(data){
                this.dialogVisible=data;
            },
            //处理结点的点击事件-测试用
            handleNodeClick(data) {
                console.log(data);
                if (data.threeLevelMenuID !== undefined) {
                    this.fileURL = data.fileURL;
                    this.fileType = data.fileType;
                    this.nodeClicked = true;
                    console.log(this.fileType);
                    console.log(this.fileURL);
                }
            },
            //增加课时
            appendKS(node, data) {
                //由章节来新增课时
                if (data.oneLevelMenuID !== undefined) {
                    //发送数据
                    this.$axios
                        .post("/api/createTwoLevelMenu", null, {
                            params: {
                                parentID: data.oneLevelMenuID,
                                title: "新课时(可修改)",
                                userID: this.user.id,
                            },
                        })
                        .then((response) => {
                            console.log(response);
                            if (response.status == 200) {
                                console.log(response.data);
                                this.$message.success("增加新课时成功!");
                                //标记已修改
                                this.change++;
                            }
                        })
                        .catch((failResponse) => {
                            console.log("fail");
                            console.log(failResponse.data);
                        });

                }
            },
            //删除
            remove(node, data) {
                if(data.oneLevelMenuID !== undefined){
                    this.$axios
                        .post("/api/deleteOneLevelMenu", null, {
                            params: {
                                oneLevelMenuID: data.oneLevelMenuID,
                                userID: this.user.id,
                            },
                        })
                        .then((response) => {
                            console.log(response);
                            if (response.status == 200) {
                                console.log(response.data);
                                this.$message.success("删除章节成功");
                                //标记已修改
                                this.change++;
                            }
                        })
                        .catch((failResponse) => {
                            console.log("fail");
                            console.log(failResponse.data);
                        });

                }else if(data.twoLevelMenuID !== undefined){
                    this.$axios
                        .post("/api/deleteTwoLevelMenu", null, {
                            params: {
                                twoLevelMenuID: data.twoLevelMenuID,
                                userID: this.user.id,
                            },
                        })
                        .then((response) => {
                            console.log(response);
                            if (response.status == 200) {
                                console.log(response.data);
                                this.$message.success("删除课时成功");
                                //标记已修改
                                this.change++;
                            }
                        })
                        .catch((failResponse) => {
                            console.log("fail");
                            console.log(failResponse.data);
                        });

                }else if(data.threeLevelMenuID != undefined){
                    this.$axios
                        .post("/api/deleteThreeLevelMenu", null, {
                            params: {
                                threeLevelMenuID: data.threeLevelMenuID,
                                userID: this.user.id,
                            },
                        })
                        .then((response) => {
                            console.log(response);
                            if (response.status == 200) {
                                console.log(response.data);
                                this.$message.success("删除视频成功");
                                //标记已修改
                                this.change++;
                            }
                        })
                        .catch((failResponse) => {
                            console.log("fail");
                            console.log(failResponse.data);
                        });

                }
            },
            //增加视频
            appendSP(node, data) {

                this.videoTitle='新视频(可修改)';
                this.videoParentID=data.twoLevelMenuID
                this.dialogVisible=true;

            },
            //增加章节
            appendZJ() {
                this.$axios
                    .post("/api/createOneLevelMenu", null, {
                        params: {
                            title: "新章节(可修改)",
                            userID: this.user.id,
                        },
                    })
                    .then((response) => {
                        console.log(response);
                        if (response.status == 200) {
                            console.log(response.data);
                            this.$message.success("增加新章节成功!");
                            //标记已修改
                            this.change++;
                        }
                    })
                    .catch((failResponse) => {
                        console.log("fail");
                        console.log(failResponse.data);
                    });
            },
            update(data) {
                this.dialogVisible = true;
            },
            //改变标题值
            changeTitle(node, data) {
                this.$prompt("请输入标题", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                })
                    .then(({ value }) => {
                        if(data.oneLevelMenuID!==undefined ){
                            console.log("Level-1");
                            //修改章节标题
                            this.$axios
                                .post("/api/editOneLevelMenu", null, {
                                    params: {
                                        title: value,
                                        oneLevelMenuID:data.oneLevelMenuID,
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
                                    }
                                })
                                .catch((failResponse) => {
                                    console.log("fail");
                                    console.log(failResponse.data);
                                });
                        }else if(data.twoLevelMenuID!==undefined ){
                            console.log("Level-2");
                            //修改课时标题
                            this.$axios
                                .post("/api/editTwoLevelMenu", null, {
                                    params: {
                                        title: value,
                                        twoLevelMenuID:data.twoLevelMenuID,
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
                                    }
                                })
                                .catch((failResponse) => {
                                    console.log("fail");
                                    console.log(failResponse.data);
                                });
                        }else if(data.threeLevelMenuID!==undefined ){
                            console.log("Level-3");
                            console.log(data);
                            //修改视频标题
                            this.$axios
                                .post("/api/editThreeLevelMenuTitle", null, {
                                    params: {
                                        title: value,
                                        threeLevelMenuID:data.threeLevelMenuID,
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
                                    }
                                })
                                .catch((failResponse) => {
                                    console.log("fail");
                                    console.log(failResponse.data);
                                });
                        }
                    })
                    .catch(() => {});
            },
            //自定义树形结构渲染器
            renderContent(h, { node, data, store }) {
                if (data.title.indexOf("目录") !== -1) {

                    //章节
                } else if (data.oneLevelMenuID !== undefined) {
                    return (
                        <span class="custom-tree-node">
            <span>{"章节名"}</span>
            <span>{":"}</span>
            <span>{data.title}</span>
            <span>
              <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.appendKS(node, data)}
              >
                添加课时
              </el-button>
              <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.remove(node, data)}
              >
                删除章节
              </el-button>
              <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.changeTitle(node, data)}
              >
                修改标题
              </el-button>
            </span>
          </span>
                    );
                    //课时
                } else if (data.twoLevelMenuID !== undefined) {
                    return (
                        <span class="custom-tree-node">
            <span>{"课时名"}</span>
            <span>{":"}</span>
            <span>{data.title}</span>
            <span>
              <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.appendSP(node, data)}
              >
                添加课件
              </el-button>
              <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.remove(node, data)}
              >
                删除课时
              </el-button>
              <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.changeTitle(node, data)}
              >
                修改标题
              </el-button>
            </span>
          </span>
                    );
                    //视频
                } else {
                    return (
                        <span class="custom-tree-node">
            <span>{"视频名"}</span>
            <span>{":"}</span>
            <span>{data.title}</span>
            <span>
              <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.update(data)}
              >
                更新视频
              </el-button>
              <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.remove(node, data)}
              >
                删除视频
              </el-button>
              <el-button
                  size="mini"
                  type="text"
                  on-click={() => this.changeTitle(node, data)}
              >
                修改标题
              </el-button>
            </span>
          </span>
                    );
                }
            },
        },
    }
</script>

<style scoped>
    #loginBox {
        display: none;
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
