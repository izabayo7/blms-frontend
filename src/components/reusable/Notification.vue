<template>
  <div class="notifications" ref="notification">
    <!-- notification icon -->
    <div class="icon" @click="cardActive = !cardActive">
      <div class="shade" :class="{ iconActive: cardActive }">
        <div class="hold">
          <v-icon>mdi-bell-outline</v-icon>
          <div class="number">{{ unReads }}</div>
        </div>
      </div>
    </div>

    <!-- notification card -->
    <transition
      enter-active-class="animate__animated animate__fadeIn animate__faster"
    >
      <div class="my-card" v-if="cardActive">
        <div class="customScroll">
          <div class="head">Notifications</div>
          <!-- notification item -->
          <div
            v-for="(no, i) in formatedNotifications"
            :key="i"
            class="item"
            @click="$route.path === no.link ? undefined : $router.push(no.link)"
            @click.stop="cardActive = false"
          >
            <img class="pic" src="@/assets/images/instructor.png" />
            <div class="content">
              <p class="msg">
                <span>{{ no.name }}</span> {{ no.msg }}
              </p>
              <p class="time">{{ no.time | getTimeDifference }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Notification",
  data() {
    return {
      numberOfNewNotifications: 4,
      cardActive: false,
    };
  },
  computed: {
    number() {
      return this.numberOfNewNotifications > 9
        ? "9+"
        : `${this.numberOfNewNotifications}`;
    },
    ...mapGetters("notification", ["loaded", "notifications"]),
    formatedNotifications() {
      let notifications = [];
      if (this.notifications.length > 0) {
        console.log(this.notifications);
        for (const i in this.notifications) {
          notifications.push({
            name: `${this.notifications[i].notification.doer.surName} ${this.notifications[i].notification.doer.otherNames}`,
            msg: this.notifications[i].notification.content,
            time: this.notifications[i].notification.createdAt,
            link: this.notifications[i].notification.link,
          });
        }
        for (const i in this.notifications) {
          notifications.push({
            name: `${this.notifications[i].notification.doer.surName} ${this.notifications[i].notification.doer.otherNames}`,
            msg: this.notifications[i].notification.content,
            time: this.notifications[i].notification.createdAt,
            link: this.notifications[i].notification.link,
          });
        }
        for (const i in this.notifications) {
          notifications.push({
            name: `${this.notifications[i].notification.doer.surName} ${this.notifications[i].notification.doer.otherNames}`,
            msg: this.notifications[i].notification.content,
            time: this.notifications[i].notification.createdAt,
            link: this.notifications[i].notification.link,
          });
        }
        for (const i in this.notifications) {
          notifications.push({
            name: `${this.notifications[i].notification.doer.surName} ${this.notifications[i].notification.doer.otherNames}`,
            msg: this.notifications[i].notification.content,
            time: this.notifications[i].notification.createdAt,
            link: this.notifications[i].notification.link,
          });
        }
      }

      return notifications;
    },
    unReads() {
      let total = 0;
      for (const i in this.notifications) {
        if (this.notifications[i].status > 1) {
          total++;
        }
      }
      return total;
    },
  },
  methods: {
    ...mapActions("notification", ["getNotifications"]),
    outsideClickDetector() {
      let self = this;
      document.addEventListener("click", function (e) {
        if (self.$refs.notification.contains(e.target) == false) {
          self.cardActive = false;
        }
      });
    },
  },
  mounted() {
    this.outsideClickDetector();
    this.getNotifications(this.$store.state.user.user._id);
  },
};
</script>
<style lang="scss">
.notifications {
  position: relative;
  width: fit-content;
  float: right;

  .icon {
    position: relative;
    display: flex;
    cursor: pointer;
    padding: 0.6rem;
    float: right;

    //notification number editor
    .number {
      color: $main;
      background-color: $primary;
      font-size: 0.7rem;
      width: 1rem;
      height: 1rem;
      text-align: center;
      border-radius: 50%;
      position: absolute;
      top: 0px;
      left: 10px;
    }
  }
  .shade {
    padding: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: $secondary;
      border-radius: 50%;
    }
    .hold {
      position: relative;
    }
  }

  //when notification is active
  .iconActive {
    background-color: $secondary;
    border-radius: 50%;
    transition: 0.5s ease-in background-color;
  }

  //notification card
  .my-card {
    overflow-wrap: anywhere;
    .customScroll {
      max-height: calc(100vh - 133px);
      overflow-y: auto;
    }

    position: absolute;
    top: 65px;
    left: -254px;
    background-color: $main;
    color: $font;
    width: 20rem;
    box-shadow: 0px 0px 10px 0px lighten($color: $secondary, $amount: 4);
    border-radius: 10px;
    ::after {
      content: "";
      position: absolute;
      top: -10px;
      right: 35px;
      width: 20px;
      height: 20px;
      background-color: $main;
      transform: rotate(45deg);
      box-shadow: -4px -6px 3px -2px lighten($color: $secondary, $amount: 6);
    }

    //head of the card
    .head {
      text-align: center;
      font-size: 1.2rem;
      border-bottom: 1px solid lighten($color: $secondary, $amount: 2);
      padding: 1rem;
    }

    //notification item
    .item {
      padding: 0.5rem 1rem;
      display: flex;
      flex-direction: row;
      cursor: pointer;
      border-top: 1px solid lighten($color: $secondary, $amount: 2);

      &:hover {
        background-color: lighten($color: $secondary, $amount: 6);
      }
      img {
        width: 50px;
        height: 50px;
      }

      p {
        margin: 0;
        padding: 0;
        padding-left: 1rem;

        span,
        &.time {
          font-weight: bold;
        }

        &.time {
          font-size: 0.8rem;
          padding-top: 10px;
        }
      }
    }
  }
}
</style>