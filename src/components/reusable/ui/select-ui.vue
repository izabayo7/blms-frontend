<template>
  <div class="my-select">
    <div class="select-container">
      <label :for="id" class="d-flex">
        <select v-model="content" @change="handleInput" :name="name" :id="id">
          <option :value="label" disabled selected>{{ label }}</option>
          <option v-for="(option, i) in options" :value="option" :key="i">
            {{ option }}
          </option>
        </select>
        <svg
          class="drop-down-icon"
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.4076 0.925598L4.90474 4.41512L8.40189 0.925598L9.47617 1.99988L4.90474 6.57131L0.333313 1.99988L1.4076 0.925598Z"
            fill="black"
          />
        </svg>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "select-ui",
  props: {
    id: { required: true, type: String },
    name: { required: true, type: String },
    options: {},
    label: String
  },
  data() {
    return {
      content: this.label,
    };
  },
  methods: {
    handleInput() {
      this.$emit("input", this.content);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-select {
  .select-container {
    border: 1.5px solid lighten($grayish, 20%);
    border-radius: 2px;
    padding: 0.6rem 1.4rem 0.6rem 0;

    label {
      @include input-el;

      select {
        width: 100%;
        padding-left: 1.4rem;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 11.6667px;
        /* identical to box height, or 214% */

        color: #7c7c7c;
      }
      .drop-down-icon {
        margin: auto;
      }
    }
  }
}
</style>
