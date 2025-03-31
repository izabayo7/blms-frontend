<template>
    <div class="sidebar">
        <div class="toogle"> <v-icon large>mdi-menu</v-icon></div>
        <div class="routes mt-15"> 
            <ul ref="nav">
                <div class="active-link"> </div>
                <li @click="setActive(0)" :class="{active:active == 0}"> <router-link to="/courses" > <v-icon large>mdi-school</v-icon> </router-link>  </li>
                <li @click="setActive(1)" :class="{active:active == 1}" > <router-link to="/reports" > <v-icon large>mdi-chart-box</v-icon> </router-link> </li>
                <li @click="setActive(2)" :class="{active:active == 2}" > <router-link  to="/library" > <v-icon large>mdi-bookshelf</v-icon> </router-link> </li>
                <li @click="setActive(3)" :class="{active:active == 3}" > <router-link to="/message" > <v-icon large>mdi-message-text</v-icon> </router-link> </li>
                <li @click="setActive(4)" :class="{active:active == 4}" > <router-link  to="/quiz" > <v-icon large>mdi-cog</v-icon> </router-link> </li>
            </ul>
        </div>
    </div>
</template>{
<script>
export default {
    name:'Sidebar',
    data(){
        return{
            active:1
        }
    },
    methods:{
        setActive(n){
            this.active = n
            
            console.log(this.$refs['nav'])
        }
    }
}
</script>
<style lang="scss" scoped>


.sidebar{
    height: 100vh;
    box-shadow: 0px 0px 15px 0px $secondary;
    .toogle{
        padding:1rem;
        margin: auto;
        width: fit-content;
        cursor: pointer;
    }

    .routes{

        ul{
            list-style-type: none;
            padding: 1rem;
            position: relative;

            .active-link{
                display: none;
                width: 3.5rem;
                height: 3.5rem;
                margin: 0 auto;
                background:$primary;
                position: absolute;
                border-radius: 10px;
                box-shadow: 0 0 10px 0 lighten($color: $primary, $amount: 20);
            }
            li{
                padding: .5rem;
                margin: 1.5rem .5rem;
                cursor: pointer;

                &.active{
                    background:$primary;
                    border-radius: 10px;
                    box-shadow: 0 0 10px 0 lighten($color: $primary, $amount: 20);
                    i{
                        color:white;
                    }
                }

            }

        }

    }
}
</style>