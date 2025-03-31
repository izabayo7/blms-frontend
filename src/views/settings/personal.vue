<template>
  <v-container fluid class="inner customScroll px-6 pl-lg-14 pr-md-2 pt-6">
    <v-row v-if="user">
      <div class="col-12 col-md-6">
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <path
                d="M3.74474 8.62434V11.2418L8.9881 13.7415L14.2315 11.2418V8.62434L8.9881 11.124L3.74474 8.62434ZM8.9881 1.96289L0.748535 5.88909L8.9881 9.81528L15.7296 6.60235V11.124H17.2277V5.88909L8.9881 1.96289Z"
                fill="#FF7700"/>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="17.9772" height="15.7048" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <span class="college_name">
          {{ state.name }}
        </span>
      </div>
      <div class="col-12 col-md-6 justify-end d-flex align-center">
        <div class="action">
          <button class="upgrade">Change password</button>
        </div>
      </div>
      <div class="col-12 col-md-10">
        <div class="row align-center">
          <div class="col-12 col-md-3">
            <div class="label">First name</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="editStatus[0]" class="current_value">{{ user.sur_name }}</div>
            <div v-else class="edit">
              <input v-model="user.sur_name" type="text">
              <div class="actions">
                <button class="save" @click="saveChanges(0)">Save</button>
                <button @click="toogleEdit(0)" class="cancel">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button v-if="editStatus[0]" @click="toogleEdit(0)">Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Last name</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="editStatus[1]" class="current_value">{{ user.other_names }}</div>
            <div v-else class="edit">
              <input v-model="user.other_names" type="text">
              <div class="actions">
                <button class="save" @click="saveChanges(1)">Save</button>
                <button @click="toogleEdit(1)" class="cancel">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button v-if="editStatus[1]" @click="toogleEdit(1)">Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Profile picture</div>
          </div>
          <div class="col-12 col-md-5 text-center">
            <input
                ref="file"
                type="file"
                id="picture"
                allow="image/*"
                hidden
                @change="handleFileUpload"
            />
            <img @click="pickfile()" class="college_logo cursor-pointer" :src="state.logo" alt="">
            <div v-if="editStatus[2]" class="current_value lable"><span v-if="state.logo">Click on image to update the logo </span></div>
            <div v-else class="edit">
              <div class="actions">
                <button class="save" @click="saveChanges(2)">Save</button>
                <button class="cancel" @click="toogleEdit(2);profile=undefined;document.getElementById('picture').value = ''">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button     v-if="state.logo"          @click="
                set_modal({
                  template: 'action_confirmation',
                  method: {
                    action: 'sidebar_navbar/removeLogo',
                  },
                  title: 'Remove college logo',
                  message:
                    'Are you sure you want to delete the college logo?',
                })
              " class="delete">Delete logo</button>
              <button v-else @click="pickfile" class="upgrade">Upload logo</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Username</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="editStatus[3]" class="current_value">{{ user.user_name }}</div>
            <div v-else class="edit">
              <input v-model="user.user_name" type="text">
              <div class="actions">
                <button class="save" @click="saveChanges(3)">Save</button>
                <button class="cancel" @click="toogleEdit(3)">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button v-if="editStatus[3]" @click="toogleEdit(3)">Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Contact email</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="editStatus[4]" class="current_value">{{ user.email }}</div>
            <div v-else class="edit">
              <input v-model="user.email" type="text">
              <div class="actions">
                <button class="save" @click="saveChanges(4)">Save</button>
                <button class="cancel" @click="toogleEdit(4)">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button v-if="editStatus[4]" @click="toogleEdit(4)">Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Contact phone</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="editStatus[5]" class="current_value">{{ user.phone || "not yet set" }}</div>
            <div v-else class="edit">
              <input v-model="user.phone" type="text">
              <div class="actions">
                <button class="save" @click="saveChanges(5)">Save</button>
                <button class="cancel" @click="toogleEdit(5)">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button v-if="editStatus[5]" @click="toogleEdit(5)">Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Deactivate accout</div>
          </div>
          <div class="col-12 col-md-5">
            <div class="current_value predefined">Deactivating your intitution’s account may result in loss of data
              including: user accounts, messages, courses and all user generated data in this institution
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button class="delete" @click="
                set_modal({
                  template: 'action_confirmation',
                  method: {
                  },
                  title: 'Delege account',
                  message:
                    'Are you sure you want to delete this account?',
                })">Delete account</button>
            </div>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>

import Apis from "@/services/apis";
import {mapActions, mapMutations, mapState} from "vuex";
import jwt from "jsonwebtoken";

export default {
  name: "Personal Settings",
  data: () => ({
    editStatus: [true, true, true, true, true,true],
    img: "",
    logo: undefined,
  }),
  computed: {
    ...mapState("sidebar_navbar", {state: "college"}),
    user() {
      const user = JSON.stringify(this.$store.state.user.user);
      return JSON.parse(user);
    },
  },
  methods: {
    ...mapActions("modal", ["set_modal"]),
    pickfile() {
      document.getElementById("picture").click();
    },
    ...mapMutations("sidebar_navbar", {
      set_college: "SET_COLLEGE_INFO",
    }),
    toogleEdit(index) {
      this.$set(this.editStatus, index, !this.editStatus[index])
    },
    handleFileUpload() {
      this.logo = document.getElementById("picture").files[0]
      this.toogleEdit(1)
    },
    async callback(res, index) {
      if (res.data.status !== 200)
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: res.data.message,
          status: "danger",
          uptime: 2000,
        });
      else {
        // set the token in the session
        this.$session.set("jwt", res.data.data);
        this.toogleEdit(index)
        const user = await jwt.decode(this.$session.get("jwt"));
        this.$store.dispatch("user/setUser", user);
      }
    },
    saveChanges(index) {
      const user = this.$store.state.user.user
      let obj

      if (index !== 2) {
        switch (index) {
          case 0: {
            if (this.user.sur_name === user.sur_name)
              return
            else
              obj = {sur_name: this.user.sur_name}
            break
          }
          case 1: {
            if (this.user.other_names === user.other_names)
              return
            else {
              obj = {other_names: this.user.other_names}
              break
            }
          }
          case 3: {
            if (this.user.user_name === user.user_name)
              return
            else {
              obj = {user_name: this.user.user_name}
              break
            }
          }
          case 4: {
            if (this.user.email === user.email)
              return
            else {
              obj = {email: this.user.email}
              break
            }
          }
          case 5: {
            if (this.user.phone === user.phone)
              return
            else {
              obj = {phone: this.user.phone}
              break
            }
          }
        }
        Apis.put('user', obj).then((res) => {
          this.callback(res, index)
        })
      } else {
        obj = new FormData()
        obj.append('file', this.logo)

        this.$store.dispatch("modal/set_modal", {
          template: "display_information",
          title: "Updating Logo",
          message: `uploading logo`,
        });

        Apis.update('college', this.state._id + '/logo', obj,
            {
              onUploadProgress: (progressEvent) => {
                this.$store.dispatch(
                    "modal/set_progress",
                    parseInt(
                        Math.round((progressEvent.loaded / progressEvent.total) * 100)
                    )
                );
              },
            }).then((res) => {
          this.callback(res, index)
        })
      }
    },
  }
};
</script>

<style lang="scss">
@import '../../assets/sass/imports/settings';
</style>