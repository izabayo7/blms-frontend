<template>
    <div class="my-unreal-time-discussion-board">
        <div class="unreal-time-discussion-bord-container px-3 py-5">
            <div class="head mb-5" v-if="head_visible">
                <discussion-head content="Economics Basics part II" :live="true"/>
            </div>
            <div class="student-new-comment mb-5">
                <student-new-comment-with-photo @sent="sent" />
            </div>
            <div class="unreal-time-discussions-holder">
                <!--                <div class="new-comment">-->
                <!--                    <new-comment />-->
                <!--                </div>-->
                <div class="unreal-time-discussions">
                    <div class="discussion" v-for="comment in comments" :key="comment._id">
                        <discussion :content="comment"/>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    // import NewComment from "./NewComment";
    import Discussion from "./Discussion";
    import DiscussionHead from "./DiscussionHead";
    import StudentNewCommentWithPhoto from "./StudentNewCommentWithPhoto";
    import api from '@/services/apis'

    export default {
        name: "UnrealTimeDiscussionBoard",
        props:{
            head_visible:{default:false,type:Boolean,}
        },
        data(){
            return {
                comments:[]
            }
        },
        components:{
            StudentNewCommentWithPhoto,
            // NewComment,
            Discussion,
            DiscussionHead
        },
        methods:{
            async get_comments(){
                const comments = await api.get("comment")
                this.comments = comments.data.data
                console.log(this.comments)
            },
            sent(comment){
                this.comments.unshift(comment)
            }
        },
        mounted() {
            this.get_comments()
        }
    }
</script>

<style lang="scss" scoped>
.my-unreal-time-discussion-board{
    width: 100%;
    .unreal-time-discussion-bord-container{
        background-color: $main;
    }
}
</style>