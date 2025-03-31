<template>
  <v-container fluid class="inner customScroll px-6 pl-lg-14 pr-md-2 pt-6">
    <v-row>
      <div class="col-12 col-md-6">
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <path d="M3.74474 8.62434V11.2418L8.9881 13.7415L14.2315 11.2418V8.62434L8.9881 11.124L3.74474 8.62434ZM8.9881 1.96289L0.748535 5.88909L8.9881 9.81528L15.7296 6.60235V11.124H17.2277V5.88909L8.9881 1.96289Z" fill="#FF7700"/>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="17.9772" height="15.7048" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <span class="college_name">
          {{ $store.state.sidebar_navbar.college.name }}
        </span>
      </div>
      <div class="col-12 col-md-6 justify-end d-flex align-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.66683 6.66699V11.3337H4.66683V6.66699H2.66683ZM6.66683 6.66699V11.3337H8.66683V6.66699H6.66683ZM1.3335 14.667H14.0002V12.667H1.3335V14.667ZM10.6668 6.66699V11.3337H12.6668V6.66699H10.6668ZM7.66683 0.666992L1.3335 4.00033V5.33366H14.0002V4.00033L7.66683 0.666992Z" fill="#FF4E4E"/>
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
            <div v-if="1==1" class="current_value">{{ $store.state.sidebar_navbar.college.name }}</div>
            <div v-else class="edit">
              <input type="text">
              <div class="actions">
                <button class="save">Save</button>
                <button class="cancel">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button>Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Institution logo</div>
          </div>
          <div class="col-12 col-md-5 text-center">
            <img class="college_logo" :src="$store.state.sidebar_navbar.college.logo" alt="">
            <div class="current_value lable">Click on image to update the logo</div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button>Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Institution moto</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="1==1" class="current_value">Accredited by Ministerial order </div>
            <div v-else class="edit">
              <input type="text">
              <div class="actions">
                <button class="save">Save</button>
                <button class="cancel">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button>Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Institutions’ Address</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="1==1" class="current_value">Kicukiro , kG 27 AV</div>
            <div v-else class="edit">
              <input type="text">
              <div class="actions">
                <button class="save">Save</button>
                <button class="cancel">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button>Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Contact email</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="1==1" class="current_value">admin@institution.ac.rw</div>
            <div v-else class="edit">
              <input type="text">
              <div class="actions">
                <button class="save">Save</button>
                <button class="cancel">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button>Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Contact  phone</div>
          </div>
          <div class="col-12 col-md-5">
            <div v-if="1==1" class="current_value">+250788304859</div>
            <div v-else class="edit">
              <input type="text">
              <div class="actions">
                <button class="save">Save</button>
                <button class="cancel">Cancel</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button>Change</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Deactivate accout</div>
          </div>
          <div class="col-12 col-md-5">
            <div class="current_value predefined">Deactivating your intitution’s account may result in loss of data including: user accounts, messages, courses and all user generated data in this institution</div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button class="delete">Delete account</button>
            </div>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
// import {mapActions, mapGetters, mapState} from "vuex";
// import Apis from "@/services/apis";
// import {elapsedDuration} from "../../../services/global_functions";

export default {
  name: "Settings",
  data: () => ({

  }),
  computed: {

  },
  components: {

  },
  methods: {

  },
};
</script>

<style lang="scss">
@import '../../assets/sass/imports/settings';
</style>