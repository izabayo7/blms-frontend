<template>
  <div class="my-reply-comment">
    <div class="reply-comment-container">
      <div class="left">
        <div class="avatar">
          <v-avatar :size="30" class="a_avatar">{{
            fullNames | computeText
          }}</v-avatar>
        </div>
      </div>
      <div class="right">
        <div class="comment">
          <h4 class="comment__name">
            <span>{{ fullNames }} </span
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { elapsedDuration } from "../../services/global_functions";
export default {
  name: "ReplyComment",
  props: {
    content: { required: true },
    verified: { default: false, type: Boolean },
  },
  computed: {
    elapsedTime() {
      return elapsedDuration(this.content.createdAt);
    },
    fullNames() {
      return `${this.content.sender.sur_name} ${this.content.sender.other_names}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-reply-comment {
  .reply-comment-container {
    display: flex;
    .left {
      .avatar {
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-right: 0.5rem;
        .a_avatar {
          background-color: $primary;
          color: $main;
          font-size: 0.9rem;
        }
      }
    }
    .right {
      flex-grow: 1;
      .comment {
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
        &__name {
          display: flex;
          align-items: center;
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
      }
    }
  }
}
</style>