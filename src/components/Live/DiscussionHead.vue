<template>
    <div class="my-discussion-head">
        <div class="discussion-head-container">
            <h1>{{content}}</h1>
            <div class="live ml-8 px-6" v-if="live">
                <span>live</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DiscussionHead",
        props:{
            content:{required:true,type:String},
            live:{type:Boolean,default:false}
        }
    }
</script>

<style lang="scss" scoped>
    .my-discussion-head{
        .discussion-head-container{
            display: flex;

            .live{
                align-self: center;
                background-color: $danger;
                height: fit-content;
                border-radius: 20px;

                span{
                    color:$main;
                    font-size: .8rem;
                }
            }
        }
    }
</style>