<template>
    <div class="my-discussion">
        <div class="my-discussion-container">
            <div class="left">
                <div class="avatar">
                    <v-avatar :size="30" class="a_avatar">{{user.sur_name | computeText}}</v-avatar>
                </div>
            </div>
            <div class="right">
                <div class="comment">
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
    import {mapGetters} from 'vuex'

    export default {
        name: "Discussion",
        components: {
            ReplyComment,

        },
        computed:{
            ...mapGetters('user',['user'])
        }
    }
</script>

<style lang="scss" scoped>
.my-discussion{
    .my-discussion-container{
        display: flex;

        .left{
            .avatar{
                padding-top: 1rem;
                padding-bottom: 1rem;
                padding-right: .5rem;
                .a_avatar{
                    background-color: $primary;
                    color:$main;
                    font-size: .9rem;
                }
            }
        }
    }
}
</style>