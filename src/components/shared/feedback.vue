<template>
    <div class="feedback">{{message}}</div>
</template>

<script>
    // import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
    export default {
        props:{
          message:{
              type: String,
              required: true
          }
        },
        computed: {
        },
        methods: {
        },
    };
</script>
<style lang="scss">
    .feedback{
        width: 230px;
        height: 47px;
        background-color: red;
        position: fixed;
        align-self: flex-end;
        margin: 11px;
        bottom: 0;
        float: right;
    }
</style>