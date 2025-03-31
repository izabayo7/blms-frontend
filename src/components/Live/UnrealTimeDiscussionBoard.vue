<template>
    <div class="my-unreal-time-discussion-board">
        <div class="unreal-time-discussion-bord-container px-3 py-5">
            <div class="head mb-5">
                <discussion-head content="Economics Basics part II" :live="true"/>
            </div>
            <div class="student-new-comment mb-5">
                <student-new-comment-with-photo />
            </div>
            <div class="unreal-time-discussions-holder">
                <!--                <div class="new-comment">-->
                <!--                    <new-comment />-->
                <!--                </div>-->
                <div class="unreal-time-discussions">
                    <discussion />
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


    export default {
        name: "UnrealTimeDiscussionBoard",
        components:{
            StudentNewCommentWithPhoto,
            // NewComment,
            Discussion,
            DiscussionHead
        }
    }
</script>

<style lang="scss" scoped>
.my-unreal-time-discussion-board{
    .unreal-time-discussion-bord-container{
        background-color: $main;
    }
}
</style>