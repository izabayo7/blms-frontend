<template>
  <v-container fluid class="inner customScroll px-6 pl-lg-14 pr-md-2 pt-6">
    <v-row v-if="state">
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
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M2.66683 6.66699V11.3337H4.66683V6.66699H2.66683ZM6.66683 6.66699V11.3337H8.66683V6.66699H6.66683ZM1.3335 14.667H14.0002V12.667H1.3335V14.667ZM10.6668 6.66699V11.3337H12.6668V6.66699H10.6668ZM7.66683 0.666992L1.3335 4.00033V5.33366H14.0002V4.00033L7.66683 0.666992Z"
              fill="#FF4E4E"/>
        </svg>
        <span class="account_type">
          Trial Account
        </span>
      </div>
      <div class="col-12 col-md-10">
        <div class="row align-center">
          <div class="col-12 col-md-3">
            <div class="label">Institution name</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="editStatus[0]" class="current_value">{{ state.name }}</div>
            <div v-else class="edit">
              <input v-model="college.name" type="text">
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
            <div class="label">Institution logo</div>
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
            <div v-if="editStatus[1]" class="current_value lable"><span v-if="state.logo">Click on image to update the logo </span></div>
            <div v-else class="edit">
              <div class="actions">
                <button class="save" @click="saveChanges(1)">Save</button>
                <button class="cancel" @click="toogleEdit(1);profile=undefined;document.getElementById('picture').value = ''">Cancel</button>
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
              " class="delete profile">Remove logo</button>
              <button v-else @click="pickfile" class="upgrade">Upload logo</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Institution moto</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="editStatus[2]" class="current_value">{{ state.motto || "not yet set" }}</div>
            <div v-else class="edit">
              <input v-model="college.motto" type="text">
              <div class="actions">
                <button class="save" @click="saveChanges(2)">Save</button>
                <button class="cancel" @click="toogleEdit(2)">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button v-if="editStatus[2]" @click="toogleEdit(2)">Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Institutions’ Address</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="editStatus[3]" class="current_value">{{ state.location || "not yet set" }}</div>
            <div v-else class="edit">
              <input v-model="college.location" type="text">
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
            <div v-if="editStatus[4]" class="current_value">{{ state.email || "not yet set" }}</div>
            <div v-else class="edit">
              <input v-model="college.email" type="text">
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
            <div v-if="editStatus[5]" class="current_value">{{ state.phone || "not yet set" }}</div>
            <div v-else class="edit">
              <input v-model="college.phone" type="text">
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
                  title: 'Delege college',
                  message:
                    'Are you sure you want to delete this college?',
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

export default {
  name: "InstitutionSettings",
  data: () => ({
    editStatus: [true, true, true, true, true, true, true],
    img: "",
    logo: undefined,
    college: {
      name: "",
      motto: "",
      location: "",
      email: "",
      phone: ""
    }
  }),
  beforeMount() {
    this.constructCollege()
  },
  computed: {
    ...mapState("sidebar_navbar", {state: "college"}),
  },
  watch: {
    state() {
      if (this.state) {
  this.constructCollege()
      }
    }
  },
  methods: {
    constructCollege(){
      this.college.name = this.state.name
      if (this.state.motto)
        this.college.motto = this.state.motto
      if (this.state.location)
        this.college.location = this.state.location
      if (this.state.email)
        this.college.email = this.state.email
      if (this.state.phone)
        this.college.phone = this.state.phone
    },
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
    callback(res, index) {
      if (res.data.status !== 200)
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: res.data.message,
          status: "danger",
          uptime: 2000,
        });
      else {
        this.set_college(res.data.data);
        this.toogleEdit(index)
      }
    },
    saveChanges(index) {
      let obj

      if (index !== 1) {
        switch (index) {
          case 0: {
            if (this.state.name === this.college.name)
              return
            else
              obj = {name: this.college.name}
            break
          }
          case 2: {
            if (this.state.motto === this.college.motto)
              return
            else {
              obj = {motto: this.college.motto}
              break
            }
          }
          case 3: {
            if (this.state.location === this.college.location)
              return
            else {
              obj = {location: this.college.location}
              break
            }
          }
          case 4: {
            if (this.state.email === this.college.email)
              return
            else {
              obj = {email: this.college.email}
              break
            }
          }
          case 5: {
            if (this.state.phone === this.college.phone)
              return
            else {
              obj = {phone: this.college.phone}
              break
            }
          }
        }
        Apis.update('college', this.state._id, obj).then((res) => {
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