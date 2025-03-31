<template>
    <div class="my-discussion">
        <div class="my-discussion-container">
            <div class="left">
                <div class="avatar">
                    <v-avatar :size="30" class="a_avatar">{{fullNames | computeText}}</v-avatar>
                </div>
            </div>
            <div class="right">
                <div class="comment">
                    <h4 class="comment__name"><span>{{fullNames}} </span><span class="category"><svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#2196f3"/><path d="m385.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0" fill="#fafafa"/></svg></span></h4>
                    <div class="comment__time"><span>{{elapsedTime}}</span></div>
                    <div class="comment__text"> {{ content.content}}
                    </div>
                    <div class="replies" v-if=" (content.replies !== undefined && content.replies.length > 0)">
                        <div class="show-replies" @click="reply_visible = !reply_visible">
                            <p v-if="!reply_visible">show {{replyNumbers}}</p>
                            <p v-else>hide replies</p>
                        </div>
                        <div class="comment-replies" v-if="reply_visible">
                            <div class="comment-reply" v-for="reply in content.replies" :key="reply._id"><reply-comment :content="reply" /></div>
                        </div>
                    </div>
                    <div class="comment__reply-icon" v-if="!commenting" @click="commenting = !commenting">
                        <div class="inner-icon">
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M11 20L1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81C19.46 16.95 16.458 15 13 15h-2v5z"/></svg>
                            </div><div class="text"><span>reply</span></div>
                        </div>
                    </div>
                    <div class="reply-comment mt-3" v-else>
                        <new-reply-comment :reply_id="content._id" @sent="replied"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NewReplyComment from "./NewReplyComment";
    import {elapsedDuration} from '../../services/global_functions'
    import ReplyComment from "./ReplyComment";

    export default {
        name: "Discussion",
        props:{
            content:{required:true,type:Object}
        },
        components: {
            ReplyComment,
            NewReplyComment,

        },
        computed:{
            elapsedTime(){
                return elapsedDuration(this.content.createdAt)
            },
            fullNames(){
                return `${this.content.sender.sur_name} ${this.content.sender.other_names}`
            },
            replyNumbers(){
                // const text =
                return this.content.replies.length + `${this.content.replies.length > 1 ? ' replies' : ' reply'}`
            }
        },
        data(){
            return{
                commenting:false,
                reply_visible:false,
            }
        },
        methods:{
            replied(data){
                this.$emit('replied',data)
            }
        },
    }
</script>

<style lang="scss" scoped>
.my-discussion{
    .my-discussion-container{
        display: flex;
        background-color: $main;
        padding:.4rem;
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
        .right{
            flex-grow: 1;
            .comment{
                &__name{
                    display: flex;
                    align-items: center;
                    .category{
                        margin-left: .5rem;
                        width: fit-content;
                        height: fit-content;
                        display: flex;
                        align-items: center;
                        svg{
                            /*transform: scale(.1);*/
                            fill:red;
                            width: .7rem;
                            height: .7rem;
                            stroke:red;

                            path:first-child{
                                fill:lighten($font,20);
                            }
                        }
                    }
                }
                &__time{
                    font-size: .7rem;

                    span{
                        color:lighten($font,35);
                    }
                }
                &__text{
                    font-size: .9rem;
                }
                &__reply-icon{
                    font-size: .8rem;
                    margin-top: .4rem;

                    .inner-icon{
                        display: flex;
                        background-color:$tertiary;
                        @include fit-content;
                        padding-right: .5rem;
                        padding-left: .5rem;
                        border-radius: 50px;
                        cursor: pointer;

                        &:hover{
                            background-color: $secondary;
                        }

                        .icon{
                            @include   fit-content;
                            @include flex-center;
                            svg{
                                transform: scale(.75);
                                fill:$font;
                            }
                        }
                        .text{
                            @include flex-center;
                        }
                    }
                }

                .comment-replies{
                    padding-left: 1rem;
                    margin-left: 1rem;
                    border-left: 2px solid $tertiary;
                }

                .show-replies{
                    p{
                        color:$primary;
                        font-size: .8rem;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>