<template>
  <div class="student-group-container" ref="studentContainer">
    <div class="name">{{ item.name }}</div>
    <div class="details">{{ item.total_instructors }} instructors</div>
    <div class="details">{{ item.total_students }} students</div>
    <div class="actions">
      <button @click="cardActive = !cardActive">
        <svg width="3" height="13" viewBox="0 0 3 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle r="1.3" transform="matrix(-1 0 0 1 1.30001 11.6999)" fill="#193074"/>
          <circle r="1.3" transform="matrix(-1 0 0 1 1.30001 6.5002)" fill="#193074"/>
          <circle r="1.3" transform="matrix(-1 0 0 1 1.30001 1.3)" fill="#193074"/>
        </svg>
      </button>
      <transition
          enter-active-class="animate__animated animate__fadeIn animate__faster"
      >
        <div v-if="cardActive" class="content">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>

export default {
  name: "StudentGroupCard",
  data() {
    return {
      numberOfNewNotifications: 4,
      cardActive: false,
    };
  },
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    outsideClickDetector() {
      let self = this;
      document.addEventListener("click", function (e) {
        if (!self.$refs['studentContainer'] || !self.$refs.studentContainer.contains(e.target)) {
          self.cardActive = false;
        }
      });
    },
  },
  mounted() {
    this.outsideClickDetector();
  },
};
</script>
<style lang="scss">
.student-group-container {
  width: 347px;
  height: 160px;
  padding: 18px 21px;
  background: #FFFFFF;
  box-shadow: 0px 10px 36px #DEDEDE;
  font-family: Inter;
  font-style: normal;

  .name {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #193074;
    margin-bottom: 20px;
  }

  .details {
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #666666;
    margin-bottom: 10px;
  }

  position: relative;

  .actions {
    position: absolute;
    top: 20px;
    right: 21px;

    .content {
      z-index: 6;
      button {
        display: block;
        margin-bottom: 18px;
        width: 100%;
        padding-left: 14px;

        &:hover {
          background: #cde5ef;
        }

        text-align: left;
      }

      position: absolute;
      width: 130px;
      height: 119px;
      left: -20px;
      padding-top: 14px;
      background: #FFFFFF;
      border: 1px solid #D7D7D7;
      box-sizing: border-box;
      border-radius: 3px;
    }
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .student-group-container {
    .actions {
      .content {
        left: -129px;
      }
    }
  }
}
</style>