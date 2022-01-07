<template>
    <div class="comment">
        <el-card>
            <el-avatar :src="'https://lintianle.cn:8443' + comment.avatar"></el-avatar>
            <div class="author-info">
                <span class="author-name">{{comment.username}}</span>
                <span class="author-time">{{comment.timeUpdatedAt}}</span>
            </div>
            <span class="author-comment">{{comment.content}}</span>
            <i class="el-icon-s-comment" @click="displayInput(commentOrReplyID)"></i>
<!--            <i style="color: red" class="el-icon-s-comment" v-show="hideReplyBtn" @click="hideInput(commentOrReplyID)"></i>-->
            <div>
                <i v-show="like" class="el-icon-caret-top" @click="likeCommentOrReply(commentOrReplyID)"></i>
                <i v-show="dislike" style="color: red" class="el-icon-caret-top" @click="dislikeCommentOrReply(commentOrReplyID)"></i>

                <span v-if="comment.commentID!=undefined">{{comment.commentLike}}</span>
                <span v-else>{{comment.replyLike}}</span>
            </div>
            <div v-show="commentOrReplyID == showInputID">
<!--            <div v-show="showInput">-->
                <el-input v-model="input" placeholder="请输入内容"></el-input>
                <el-button type="primary" @click="sendReply">Submit</el-button>
            </div>
            <Comment v-for="comment in comment.children" :likeList="likeList" :comment="comment" :key="comment.commentID"></Comment>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Comment",
        data: function (){
            return {
                user : {
                    sessionId: "",
                    avatar: "",
                    id: 0,
                    password: "",
                    teacher: false,
                    username: ""
                },
                input: '',
                commentOrReplyID: this.comment.commentID!=undefined ? this.comment.commentID : this.comment.replyID,
                threeLevelMenuID:0,
                like: true,
                dislike: false,
            }
        },
        props:[
            "comment",
            "likeList",
        ],
        methods: {
            likeFlag(){
                console.log(this.likeList)
                console.log(this.likeList.indexOf(this.commentOrReplyID))
                if(this.likeList.indexOf(this.commentOrReplyID)!=-1){
                    this.like = false
                    this.dislike = true
                }
            },
            dislikeCommentOrReply(commentOrReplyID){
                console.log(commentOrReplyID)
                this.$axios
                    .post('/api/dislikeCommentOrReply/', null, {
                        params: {
                            threeLevelMenuID: this.threeLevelMenuID,
                            commentOrReplyID : commentOrReplyID,
                            userID : this.user.id,
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        this.like = true
                        this.dislike = false
                        this.comment.commentLike = response.data.commentLike
                        this.comment.replyLike = response.data.replyLike
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            likeCommentOrReply(commentOrReplyID){
                console.log(commentOrReplyID)
                this.$axios
                .post('/api/likeCommentOrReply/', null, {
                    params: {
                        threeLevelMenuID: this.threeLevelMenuID,
                        commentOrReplyID : commentOrReplyID,
                        userID : this.user.id,
                    }
                })
                .then((response) => {
                    console.log(response)
                    this.like = false
                    this.dislike = true
                    this.comment.commentLike = response.data.commentLike
                    this.comment.replyLike = response.data.replyLike
                })
                .catch((error) => {
                    console.log(error)
                })
            },
            displayInput(commentOrReplyID) {
                if(commentOrReplyID == this.$store.state.showInputID && this.showInput==true) {
                    this.$store.commit('setShowInput', false)
                    this.$store.commit('setShowInputID', 0)
                    // console.log(this.$store.state.showInput)
                    // console.log(this.$store.state.showInputID)
                } else if(commentOrReplyID != this.$store.state.showInputID && this.showInput==true){
                    this.$store.commit('setShowInputID', commentOrReplyID)
                    // console.log(this.$store.state.showInput)
                    // console.log(this.$store.state.showInputID)
                } else if(commentOrReplyID != this.$store.state.showInputID && this.showInput==false){
                    this.$store.commit('setShowInputID', commentOrReplyID)
                    this.$store.commit('setShowInput', true)
                    // console.log(this.$store.state.showInput)
                    // console.log(this.$store.state.showInputID)
                }
                // this.showReplyBtn = false;
                // this.hideReplyBtn = true;
            },
            hideInput(){
                this.$store.commit('setShowInputID', 0)

                // this.showReplyBtn = true;
                // this.hideReplyBtn = false
            },
            sendReply(commentOrReplyID) {
                // console.log(this.threeLevelMenuID)
                this.$axios
                .post('/api/sendReply', null, {
                    params:{
                        commentOrReplyID: this.commentOrReplyID,
                        content: this.input,
                        threeLevelMenuID: this.threeLevelMenuID,
                        userID : this.user.id,
                    }
                })
                .then((response) => {
                    this.$store.commit('setRefresh')
                    console.log(response)
                    this.$store.commit('setShowInputID', 0)
                    this.$message.success("发送成功")
                })
                .catch((error) => {
                    console.log(error)
                    this.$message.error("网络错误")
                })
            }
        },
        computed:{
            showInputID: {
                get(){
                    return this.$store.state.showInputID;
                },
                set(newValue){
                    return this.$store.commit('setShowInputID', newValue)
                }
            },
            showInput: {
                get() {
                    return this.$store.state.showInput;
                },
                set(newValue) {
                    return this.$store.commit('setShowInput', newValue)
                }
            }
        },
        watch: {
            showInputID: function (newValue) {
                this.showInputID = newValue
            },
            showInput: function (newValue){
                this.showInput = newValue
            }
        },
        created() {
            this.user = JSON.parse(localStorage.getItem("user"))
            this.threeLevelMenuID = this.$store.state.threeLevelMenuID
            this.likeFlag()
        }
    }
</script>

<style scoped>
    .el-card{
        display: inline-block;
    }
.author-info{
    display: inline-block;
}
.author-name{
    display: block;
}
.author-time{
    display: block;
}
.author-comment{
    display: block;
}
.comment{
    margin-left: 20px;
}
</style>
