<template>
  <div class="my-discussion">
    <div class="my-discussion-container" :id="content._id">
      <div class="left">
        <div class="avatar">
          <v-avatar :size="30" class="a_avatar">
            <img
                v-if="content.sender.profile"
                :src="`${content.sender.profile}?width=30`"
                alt="profile picture"
            />
            <div v-else class="text">
              {{ fullNames | computeText }}
            </div>
          </v-avatar>
        </div>
      </div>

      <div class="right">
        <div class="comment">
          <h4 class="comment__name">
            <span @mouseenter="content.sender.user_name !== $store.state.user.user.user_name ? mouseOnPic($event,content.sender.user_name,'user-profile-card') : null">{{ fullNames }} </span
            ><span v-if="verified" class="category"
          ><svg
              height="512pt"
              viewBox="0 0 512 512"
              width="512pt"
              xmlns="http://www.w3.org/2000/svg"
          >
                <path
                    d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
                    fill="#2196f3"
                />
                <path
                    d="m385.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0"
                    fill="#fafafa"
                /></svg
          ></span>
          </h4>
          <div class="comment__time">
            <span>{{ elapsedTime }}</span>
          </div>
          <div class="comment__text">{{ content.content }}</div>
          <div
              class="replies"
              v-if="content.replies !== undefined && content.replies.length > 0"
          >
            <div class="show-replies" @click="reply_visible = !reply_visible">
              <p v-if="!reply_visible">show {{ this.content.replies.length +
              `${this.content.replies.length > 1 ? " replies" : " reply"}` }}</p>
              <p v-else>hide replies</p>
            </div>
            <div class="comment-replies" v-if="reply_visible">
              <div
                  class="comment-reply"
                  v-for="reply in content.replies"
                  :key="reply._id"
              >
                <reply-comment
                    :verified="reply.sender.category !== 'STUDENT'"
                    :content="reply"
                />
              </div>
            </div>
          </div>
          <div
              class="comment__reply-icon"
              v-if="!commenting"
              @click="commenting = !commenting"
          >
            <div class="inner-icon">
              <div class="icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                  <path fill="none" d="M0 0H24V24H0z"/>
                  <path
                      d="M11 20L1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81C19.46 16.95 16.458 15 13 15h-2v5z"
                  />
                </svg>
              </div>
              <div class="text"><span>Reply</span></div>
            </div>
          </div>
          <div class="reply-comment mt-3" v-else>
            <new-reply-comment :commenter="content.sender.user_name" :reply_id="content._id" @sent="replied" :isLive="isLive"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewReplyComment from "./NewReplyComment";
import {elapsedDuration, toLocal} from "../../services/global_functions";
import ReplyComment from "./ReplyComment";
import userSimpleCard from "@/mixins/user-simple-card.mixin";

export default {
  name: "Discussion",
  props: {
    content: {required: true, type: Object},
    verified: {default: false, type: Boolean},
    isLive: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ReplyComment,
    NewReplyComment,
  },
  mixins: [userSimpleCard],
  computed: {
    fullNames() {
      return `${this.content.sender.sur_name} ${this.content.sender.other_names}`;
    },
  },
  data() {
    return {
      commenting: false,
      reply_visible: false,
      elapsedTime: "",
      interval:null
    };
  },
  methods: {
    replied(data) {
      this.commenting = false;
      // if (!this.isLive)
      this.$emit("replied", data);
    },
  },
  created(){
    // TODO increase interval on dates
    this.interval=setInterval(() => {
      this.elapsedTime = elapsedDuration(toLocal(this.content.createdAt));
    }, 1000)

  },
  destroyed(){
    clearInterval(this.interval)
  },
};
</script>

<style lang="scss" scoped>
.my-discussion {
  .my-discussion-container {
    display: flex;
    background-color: $main;
    padding: 0.4rem;

    .left {
      .avatar {
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-right: 0.5rem;

        .a_avatar {
          background-color: $primary;

          .text {
            color: $main;
            font-size: 0.9rem;
          }
        }
      }
    }

    .right {
      flex-grow: 1;

      .comment {
        &__name {
          display: flex;
          align-items: center;

          .category {
            margin-left: 0.5rem;
            width: fit-content;
            height: fit-content;
            display: flex;
            align-items: center;

            svg {
              /*transform: scale(.1);*/
              fill: red;
              width: 0.7rem;
              height: 0.7rem;
              stroke: red;

              path:first-child {
                fill: lighten($font, 20);
              }
            }
          }
        }

        &__time {
          font-size: 0.7rem;

          span {
            color: lighten($font, 35);
          }
        }

        &__text {
          font-size: 0.9rem;
        }

        &__reply-icon {
          font-size: 0.8rem;
          margin-top: 0.4rem;

          .inner-icon {
            display: flex;
            background-color: $tertiary;
            @include fit-content;
            padding-right: 0.5rem;
            padding-left: 0.5rem;
            border-radius: 50px;
            cursor: pointer;

            &:hover {
              background-color: $secondary;
            }

            .icon {
              @include fit-content;
              @include flex-center;

              svg {
                transform: scale(0.75);
                fill: $font;
              }
            }

            .text {
              @include flex-center;
            }
          }
        }

        .comment-replies {
          padding-left: 1rem;
          margin-left: 1rem;
          border-left: 2px solid $tertiary;
        }

        .show-replies {
          p {
            color: $primary;
            font-size: 0.8rem;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }
}
/* Portrait phones and smaller */
@media (max-width: 700px) {
  .my-discussion {
    .my-discussion-container {
      .right {
        .comment {
          &__name {
            font-size: 0.8rem;
          }

          &__text {
            font-size: 0.7rem;
          }
        }
      }
    }
  }
}
</style>
