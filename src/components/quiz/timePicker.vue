<template>
  <div
    class="v-input field_shadow_1 v-input--is-label-active v-input--is-dirty theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed time-picker"
  >
    <div class="v-input__control">
      <div class="v-input__slot">
        <div class="v-text-field__slot">
          <input
            v-model="hours"
            min="0"
            max="10"
            maxlength="2"
            placeholder="hh"
            id="hrsInput"
            type="number"
          />:
          <input
            v-model="minutes"
            min="0"
            max="60"
            maxlength="2"
            placeholder="mm"
            id="minInput"
            type="number"
          />:
          <input
            v-model="seconds"
            min="0"
            max="60"
            maxlength="2"
            placeholder="ss"
            id="secInput"
            type="number"
          />
        </div>
      </div>
      <div class="v-text-field__details">
        <div class="v-messages theme--light">
          <div class="v-messages__wrapper"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "timepicker",
  props: {
    duration: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    hours: 0,
    minutes: 0,
    seconds: 0,
  }),
  watch: {
    duration() {
      this.hours = this.duration.hh;
      this.minutes = this.duration.mm;
      this.seconds = this.duration.ss;
    },
    hours() {
      this.hours = this.normaliseTime(this.hours);
      this.switchStyles("hrsInput", parseInt(this.hours) <= 24);
    },
    minutes() {
      this.minutes = this.normaliseTime(this.minutes);
      this.switchStyles("minInput", parseInt(this.minutes) <= 60);
    },
    seconds() {
      this.seconds = this.normaliseTime(this.seconds);
      this.switchStyles("secInput", parseInt(this.seconds) <= 60);
    },
  },
  methods: {
    switchStyles(id, condition) {
      this.$emit("updateTime", this.hours, this.minutes, this.seconds);
      document.getElementById(`${id}`).style.color = condition
        ? "black"
        : "red";
    },
    normaliseTime(value) {
      if (value == "") return 0;
      return parseInt(value);
    },
  },
};
</script>

<style lang="scss">
.time-picker {
  width: 160px;
  input {
    text-align: center;
    padding: 6px;
  }
}
</style>