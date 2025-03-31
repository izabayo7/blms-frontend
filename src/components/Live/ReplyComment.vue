<template>
    <div class="my-reply-comment">
        <div class="reply-comment-container">
            <div class="left">
                <div class="avatar">
                    <v-avatar :size="30" class="a_avatar">{{fullNames | computeText}}</v-avatar>
                </div>
            </div>
            <div class="right">
                <div class="comment">
                    <h4 class="comment__name">{{fullNames}}</h4>
                    <div class="comment__time"><span>{{elapsedTime}}</span></div>
                    <div class="comment__text"> {{ content.content}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {elapsedDuration} from "../../services/global_functions";

    export default {
        name: "ReplyComment",
        props:{
            content:{required:true}
        },
        computed:{
            elapsedTime(){
                return elapsedDuration(this.content.createdAt)
            },
            fullNames(){
                return `${this.content.sender.sur_name} ${this.content.sender.other_names}`
            }
        },
    }
</script>

<style lang="scss" scoped>
.my-reply-comment{
    .reply-comment-container{
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
        .right{
            flex-grow: 1;
            .comment{
                &__name{

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
            }
        }
    }
}
</style>