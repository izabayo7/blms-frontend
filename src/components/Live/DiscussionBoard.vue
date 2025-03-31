<template>
    <div class="my-discussion-board">
        <div class="discussion-bord-container">
            <div class="head">
                <discussion-head />
            </div>
            <div class="discussions-holder">
<!--                <div class="new-comment">-->
<!--                    <new-comment />-->
<!--                </div>-->
                <div class="discussions">
                <discussion />
                </div>
                <div class="student-new-comment">
                    <student-new-comment />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import NewComment from "./NewComment";
    import Discussion from "./Discussion";
    import DiscussionHead from "./DiscussionHead";
    import StudentNewComment from "./StudentNewComment";

    export default {
        name: "DiscussionBoard",
        components:{StudentNewComment,
            // NewComment,
            Discussion,DiscussionHead}
    }
</script>

<style scoped>

</style>