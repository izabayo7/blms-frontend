<template>
    <div class="my-discussion">
        <div class="discussion-container">
            <div class="left">

            </div>
            <div class="right">
                <div class="head">
                    <div class="name">Joshua Kingsley</div>
                    <div class="comment">Who can support you without having
                        the idea ?
                    </div>
                    <div class="reply-icon">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M11 20L1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81C19.46 16.95 16.458 15 13 15h-2v5z"/></svg>
                        </div><div class="text"><span>reply</span></div>
                    </div>
                    <div class="reply-comment">
                        <reply-comment />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ReplyComment from "./ReplyComment";
    export default {
        name: "Discussion",
        components: {ReplyComment}
    }
</script>

<style scoped>

</style>