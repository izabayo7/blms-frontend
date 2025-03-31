<template>
<div class="my-group-setting">
  <div class="group-setting-container">
    <div class="group-header">
      <group-header v-if="!haveGroupRoute">
        <template #pic>
          <v-avatar size="50" class="avatar">
            {{ group.name | computeText }}
          </v-avatar>
        </template>
        <template #num-members>
          22 members
        </template>
      </group-header>
    </div>
    <div class="g-info">
      <group-info />
    </div>
  </div>
</div>
</template>

<script>
import GroupHeader from "@/components/messages/Group-header";
import GroupInfo from "@/components/messages/Group-info";
export default {
name: "GroupSetting",
  components: {GroupInfo, GroupHeader},
  data(){
    return{
      group:{
        name:"Kurious"
      }
    }
  },
  computed:{
    haveGroupRoute(){
      const testReg = /\/messages\/group\/[a-z]+/g //test for '/messages/group/...route
      return  testReg.test(this.$route.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-group-setting{
  height: 100%;
  .group-setting-container{
    height: inherit;
    background-color: $main;

    .group-header{
      .avatar{
        background-color: $primary;
        color:$main;
        margin:.5rem;
      }
    }

  }
}
</style>