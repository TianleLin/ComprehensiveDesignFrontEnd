<template>
    <div>
        <StudentHome></StudentHome>
        <el-container>
            <el-aside>
                <el-tree default-expand-all class="tree" :data="menus" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-aside>
            <el-main v-if="nodeClicked">
                <CourseFile :fileType="fileType" :fileURL="'http://1.14.63.16:8080'+fileURL"></CourseFile>
                <el-card>
                    <CommentToMenu :three-level-menu-i-d="threeLevelMenuID"></CommentToMenu>
                </el-card>
                <el-card v-for="comment in comment" :key="comment.commentID">
                    <!--                        {{comment.content}}-->
                    <Comment v-if="commentFlag" :likeList="likeList" :comment="comment"></Comment>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import StudentHome from "@/components/StudentHome";
    import CourseFile from "@/components/CourseFile";
    import Comment from "@/components/Comment";
    import CommentToMenu from "@/components/CommentToMenu";
    export default {
        name: "StudentCourse",
        data() {
            return {
                menus: [],
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                fileURL : '',
                fileType : '',
                nodeClicked : false,
                user : {
                    sessionId: "",
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: ""
                },
                threeLevelMenuID : 0,
                comment: [],
                commentFlag:true,
                likeList:[],
                // refreshCount:0,
            };
        },
        computed:{
            refreshFlag: {
                get(){
                    return this.$store.state.refreshFlag;
                },
                set(){
                    return this.$store.commit('setRefresh')
                }
            },
        },
        watch: {
            threeLevelMenuID :
                async function (newValue, oldValue){
                await this.$axios
                    .get('/api/getCommentOrReplyIDLikedByThreeLevelMenuIDAndUserID', {
                        params:{
                            threeLevelMenuID: newValue,
                            userID: this.user.id,
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        this.likeList = response.data;
                        console.log("like"+this.likeList)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                await this.$axios
                    .get('/api/getCommentAndReplyByThreeLevelMenuID', {
                        params:{
                            threeLevelMenuID: newValue
                        }
                    })
                    .then((response) => {
                        this.$store.commit('setThreeLevelMenuID', newValue)
                        console.log(response)
                        this.comment = response.data
                        console.log(this.comment)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                console.log(this.user.id)
            },
            refreshFlag : async function () {
                this.comment = false
                await this.$axios
                    .get('/api/getCommentAndReplyByThreeLevelMenuID', {
                        params:{
                            threeLevelMenuID: this.threeLevelMenuID
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        this.comment = response.data
                        console.log(this.comment)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                    this.$nextTick(() => {
                        this.commentFlag = true
                    })

            },
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
                if(data.threeLevelMenuID !== undefined) {
                    this.threeLevelMenuID = data.threeLevelMenuID;
                    console.log(this.threeLevelMenuID)
                    this.fileURL = data.fileURL;
                    this.fileType = data.fileType
                    this.nodeClicked = true;
                    // console.log(this.fileType)
                    // console.log(this.fileURL)
                }
            },
            async getAllMenu() {
              await this.$axios
              .get('/api/getAllMenu')
                .then((response) => {
                    console.log(response)
                    this.menus = response.data;
                })
                .catch((error) => {
                    console.log(error)
                        if(error.response.status===401) {
                            this.$router.push({name: 'Login', query: {redirect: '/studentCourse'}});
                            this.$message.info("请先登录")
                        }
                })
            },
            async getLikeList() {
                console.log(this.user.id)
                await this.$axios
                .get('/api/getCommentOrReplyIDLikedByThreeLevelMenuIDAndUserID', {
                    params:{
                        threeLevelMenuID: this.threeLevelMenuID,
                        userID: this.user.id,
                    }
                })
                .then((response) => {
                    console.log(response)
                    this.likeList = response.data;
                    console.log(this.likeList)
                })
                .catch((error) => {
                    console.log(error)
                    if(error.response.status===401) {
                        this.$router.push({name: 'Login', query: {redirect: '/studentCourse'}});
                        this.$message.info("请先登录")
                    }
                })
            },
        },
        components: {CommentToMenu, Comment, CourseFile, StudentHome},
        created() {
            // this.user = this.$store.state.user;
            this.user = JSON.parse(localStorage.getItem("user"))
            this.getAllMenu();
            this.getLikeList();
            console.log("likeList"+this.likeList)
            for (let menusKey in this.menus) {
                menusKey.fileURL = this.baseURL + menusKey.fileURL;
            }
            // for (let announcementsKey in this.announcements) {
            //     announcementsKey.avatarURL = this.baseURL + announcementsKey.avatarURL;
            // }
        }
    }
</script>

<style scoped>
.tree {
    margin-left: 50px;
}
.el-aside {
    width: auto;
}
.comment{
     /*margin-left: 50px;*/
 }
.el-card{
    text-align: left;
}
</style>
