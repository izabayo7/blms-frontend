<template>
    <div class="my-navbar row">
        <div class="my-search col-5"> <search /> </div>
        <div class="notification col-1 offset-3"> <notifications /></div>
        <div class="profile col-3"> <profile /></div>
    </div>
</template>
<script>
export default {
    name:"Navbar",
    components:{
        search:() => import("@/components/reusable/Search"),
        notifications:() => import("@/components/reusable/Notification"),
        profile:() => import("@/components/reusable/Profile")
    }
}
</script>
<style lang="scss" scoped>

.my-navbar{
    background-color: $main;
    box-shadow: 10px 0 10px 0 lighten($color: $primary, $amount: 20);
    width: 100%;
    display: flex;
    padding: 0 !important;

    
    .my-search,
    .notification,
    .profile{
        padding:.4rem;
        // justify-content: center;
        align-items: center;
    }

    .my-search{
        // padding-left: 5rem;
        margin:auto;
    }
}
</style>