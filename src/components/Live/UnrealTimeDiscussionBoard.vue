<template>
    <div class="my-unreal-time-discussion-board">
        <div class="unreal-time-discussion-bord-container">
            <div class="student-new-comment">
                <student-new-comment />
            </div>
            <!--            <div class="head">-->
            <!--                <discussion-head />-->
            <!--            </div>-->
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
    // import DiscussionHead from "./DiscussionHead";
    import StudentNewComment from "./StudentNewComment";


    export default {
        name: "UnrealTimeDiscussionBoard",
        components:{StudentNewComment,
            // NewComment,
            Discussion,
            // DiscussionHead
        }
    }
</script>

<style lang="scss" scoped>

</style>