<template>
  <button @click="target ? $router.push(target) : $router.go(-1)" rounded color="#fff">
    <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.80859 1L2.30859 6L7.80859 11" stroke="#4A4A4A" stroke-width="2"/>
    </svg>

    <span>Back</span>
  </button>
</template>
<script>
export default {
  name: "BackButton",
  props:{
    target:{
      type: String
    }
  }
}
</script>
<style lang="scss" scoped>
button{
  width: 105px;
  height: 28px;
  padding-left: 11px;
  background: #FFFFFF;
  box-shadow: 0px 4px 10px rgba(25, 48, 116, 0.12);
  &:hover{
    box-shadow: 0px 4px 10px 5px rgba(25, 48, 116, 0.12);
  }
  border-radius: 10px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: #4A4A4A;
  span {
    margin: 0 12px;
  }
}
</style>