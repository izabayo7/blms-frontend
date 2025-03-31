<script>
export default {
  methods: {
    newEmoji({target}) {
      const column = (Math.floor(Math.random() * 11)) * -22
      const row = (Math.floor(Math.random() * 4)) * -22

      target.style.backgroundPosition = `${column}px ${row}px`
    }
  }
}
</script>

<template>
  <div :style="`background-image: url(${require('@/assets/images/sprite_emojis.png')});`"
       class="emojibutton"
       @mouseleave="newEmoji" @click="$emit('click')"/>
</template>

<style lang="scss">

.emojibutton {
  background-size: 242px 88px;
  background-repeat: no-repeat;
  width: 23px;
  height: 22px;
  display: block;
}

</style>