<template>
  <div class="my-input">
    <div :class="`input-container ${valid ? '' : 'invalid'}`">
      <label :for="id" class="flex-col flex">
        <span ref="input-label">{{ label }}</span>
        <input
          @focusin="focused"
          @focusout="unfocused"
          @input="handleInput"
          @keyup.enter="submitEmail"
          v-model="input"
          :type="type"
          :name="name"
          :id="id"
        />
      </label>
    </div>
  </div>
</template>

<script>
import inputMixins from "@/mixins/input-el-mixins";
import Vue from "vue";
export default {
  name: "input-ui",
  mixins: [inputMixins],
  props: {
    id: { required: true },
    type: { default: "text" },
    name: { required: true },
    label: { require: true },
    value: String,
    valid: Boolean,
  },
  data() {
    return {
      input: this.value,
      bus: new Vue(),
    };
  },
  methods: {
    handleInput() {
      this.$emit("input", this.input);
    },
    clear() {
      this.input = "";
    },
    submitEmail() {
      this.$emit("submit");
    },
  },
  mounted() {
    this.$on("clear", this.clear);
  },
};
</script>

<style lang="scss" scoped>
.my-input {
  .input-container {
    border: 1.5px solid lighten($grayish, 20%);
    &.invalid {
      border: 1.5px solid lighten(red, 20%);
    }
    border-radius: 2px;
    padding: 0.6rem;
    label {
      @include input-el;

      span {
        color: $grayish;
      }
      input {
        width: 90%;
      }
    }
  }
}
</style>
