<template>
    <div class="my-verified-badge">
        <div class="verified-badge-container">
            <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="17.424" height="21.296" viewBox="0 0 17.424 21.296"><path id="Icon_material-verified-user" data-name="Icon material-verified-user" d="M13.212,1.5,4.5,5.372V11.18c0,5.372,3.717,10.4,8.712,11.616,4.995-1.22,8.712-6.244,8.712-11.616V5.372ZM11.276,16.988,7.4,13.116l1.365-1.365,2.507,2.5,6.379-6.379L19.02,9.244Z" transform="translate(-4.5 -1.5)" fill="#2680eb"/></svg></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VerifiedBadge"
    }
</script>

<style lang="scss" scoped>
.my-verified-badge{
    .verified-badge-container{
        .icon{
            svg{
                transform: scale(.8);
            }
        }
    }
}
</style>