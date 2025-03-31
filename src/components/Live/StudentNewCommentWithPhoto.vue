<template>
    <div class="my-student-new-comment-with-photo">
        <div class="my-student-new-comment-container-with-photo">
            <form action="" class="new-comment-with-photo">
                <div class="profile-pic">
                    <v-avatar size="30">{{ user_full_names | computeText}} </v-avatar>

                </div>
                <div class="input mx-3 px-3 py-1"><input type="text" placeholder="write something.."></div>
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
        name: "StudentNewCommentWithPhoto",
        computed:{
            ...mapGetters("user", ['user_full_names'])
        }
    }
</script>

<style lang="scss" scoped>
    .my-student-new-comment-with-photo{
        .my-student-new-comment-container-with-photo{
            form{
                display: flex;
                justify-items: center;
                background-color: $main;
                align-items: center;
                padding: .5rem;

                .profile-pic{
                    .v-avatar{
                        background-color: $primary;
                        color:$main;
                        width: 25px;
                        height: 25px;
                    }
                }
                .input{
                    width: 90%;
                    display: flex;
                    justify-items: center;
                    border-bottom:3px solid $secondary;
                }
                .send{
                    background-color: $primary;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;

                    .icon{
                        width: fit-content;
                        height: fit-content;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;

                        svg{
                            transform: scale(.8);
                            fill:$main;
                        }
                    }
                }
            }
        }
    }
</style>