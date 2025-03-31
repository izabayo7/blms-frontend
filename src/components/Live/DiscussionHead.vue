<template>
    <div class="my-discussion-head">
        <div class="discussion-head-container">
            <h1>{{content}}</h1>
            <div class="live" v-if="live">
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

</style>