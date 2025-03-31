<template>
    <div class="my-reply-comment">
        <div class="my-reply-comment-container">
            <div class="profile-pic">
                <v-avatar >{{user.sur_name | computeText}}</v-avatar>
            </div>
            <form action="" class="reply-comment">
                <div class="input"><input type="text" placeholder="write-something"></div>
                <div class="send">
                    <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"/></svg></div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "ReplyComment",
        computed:{
            ...mapGetters('user',['user'])
        }
    }
</script>

<style scoped>

</style>