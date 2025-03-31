<template>
  <div class="notifications" ref="notification">
    <!-- notification icon -->
    <div class="icon" @click="cardActive = !cardActive">
      <div class="shade" :class="{ iconActive: cardActive }">
        <div class="hold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 17H7V10.5C7 8 9 6 11.5 6C14 6 16 8 16 10.5V17ZM18 16V10.5C18 7.43 15.86 4.86 13 4.18V3.5C13 3.10218 12.842 2.72064 12.5607 2.43934C12.2794 2.15804 11.8978 2 11.5 2C11.1022 2 10.7206 2.15804 10.4393 2.43934C10.158 2.72064 10 3.10218 10 3.5V4.18C7.13 4.86 5 7.43 5 10.5V16L3 18V19H20V18L18 16ZM11.5 22C12.0304 22 12.5391 21.7893 12.9142 21.4142C13.2893 21.0391 13.5 20.5304 13.5 20H9.5C9.5 20.5304 9.71071 21.0391 10.0858 21.4142C10.4609 21.7893 10.9696 22 11.5 22Z"
                fill="#626262"/>
          </svg>
          <div v-if="unReads" class="number">{{ unReads }}</div>
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
          <!-- when there is no notification -->
          <div v-if="!notifications.length" class="n_item">
            You have no notifications
          </div>
          <!-- notification item -->
          <div
              v-for="(no, i) in formatedNotifications"
              :key="i"
              class="item"
              @click="handleNotificationClick(no,i)"
              @click.stop="cardActive = false"
          >
            <!-- <img class="pic" src="@/assets/images/instructor.png" /> -->
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
import {mapGetters, mapActions} from "vuex";
import Apis from "@/services/apis";

export default {
  name: "Notification",
  data() {
    return {
      numberOfNewNotifications: 4,
      cardActive: false,
    };
  },
  watch: {
    cardActive() {
      if (this.cardActive)
        Apis.update('user_notification', 'allSeen').then(() => {
          for (const i in this.notifications) {
            if (this.notifications[i].status === 3)
              this.notifications[i].status = 2
          }
        })
    }
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
        for (const i in this.notifications) {
          notifications.push({
            id: this.notifications[i].notification._id,
            name: this.notifications[i].notification.user ? `${this.notifications[i].notification.user.sur_name} ${this.notifications[i].notification.user.other_names}` : 'System',
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
        if (this.notifications[i].status > 2) {
          total++;
        }
      }
      return total;
    },
  },
  methods: {
    handleNotificationClick(no, index) {
      Apis.update('user_notification', `${no.id}/read`).then(() => {
        this.notifications.splice(index, 1)
        if (no.link && this.$route.path !== no.link)
          this.$router.push(no.link)
      })
    },
    ...mapActions("notification", ["getNotifications"]),
    outsideClickDetector() {
      let self = this;
      document.addEventListener("click", function (e) {
        if (!self.$refs['notification'] || !self.$refs.notification.contains(e.target)) {
          self.cardActive = false;
        }
      });
    },
  },
  mounted() {
    this.outsideClickDetector();
    this.getNotifications();
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
      align-items: center;
      display: flex;
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
    z-index: 9;

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

    .n_item {
      text-align: center;
      padding: 20px 0;
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