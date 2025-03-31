<template>
    <div class="profile">
        <p class="name"><span>Ntwari liberi</span> <v-icon>mdi-chevron-down</v-icon></p>
        <img src="@/assets/images/instructor.png" alt="profile picture">
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .profile{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 1rem;
        

        img{
            width:50px;
            cursor: pointer;
        }
        p{
            height: fit-content;
            width: fit-content;
            margin: 0;
            padding-right: 1.5rem;
            cursor: pointer;

            &:hover{
              color: darken($font,10);
            }
            span{
                padding-right: .7rem;
            }
        }
    }
</style>