<template>
  <v-container fluid class="inner px-6 pl-lg-14 pr-md-2 pt-6">
    <v-row>
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
          {{ $store.state.sidebar_navbar.college.name }}
        </span>
      </div>
      <div class="col-12 col-md-6 justify-end d-flex align-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M2.66683 6.66699V11.3337H4.66683V6.66699H2.66683ZM6.66683 6.66699V11.3337H8.66683V6.66699H6.66683ZM1.3335 14.667H14.0002V12.667H1.3335V14.667ZM10.6668 6.66699V11.3337H12.6668V6.66699H10.6668ZM7.66683 0.666992L1.3335 4.00033V5.33366H14.0002V4.00033L7.66683 0.666992Z"
              fill="#FF4E4E"/>
        </svg>
        <span class="account_type">
          {{ collegePlan ? collegePlan.plan : 'NA' }} Account
        </span>
      </div>
      <div class="col-12 col-md-10">
        <div class="row align-center">
          <div class="col-12 col-md-3">
            <div class="label">Subscription type</div>
          </div>
          <div class="col-12 col-md-5">
            <div class="current_value">{{ collegePlan ? collegePlan.plan : 'NA' }}</div>
          </div>
          <div class="col-12 col-md-4">
            <div class="action">
              <button class="upgrade" @click="showModal=true">Upgrade account</button>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">User limit</div>
          </div>
          <div class="col-12 col-md-9">
            <div class="current_value">{{ `${collegePlan ? collegePlan.college.maximum_users : 'NA'} users` }}</div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Expiration date</div>
          </div>
          <div class="col-12 col-md-9">
            <div v-if="paymentStatus === undefined" class="current_value">NA</div>
            <div class="current_value">{{ paymentStatus.endDate | formatDate }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-3">
            <div class="label">Payment mode</div>
          </div>
          <div class="col-12 col-md-9">
            <div class="current_value">Please enter you prefered payment method</div>
            <div class="modes">
              <button class="active">Credit/Debit cards</button>
              <button>MTN Momopay</button>
            </div>
            <div class="current">
              <div class="col-8">
                <div class="d-flex">
                  <div class="user_name">Kabanda Bertrand</div>
                  <div class="card_number">xxxx-5895</div>
                  <div class="default">Default</div>
                </div>
                <div>Expires on 05/25 Added on 24 May 2020</div>
              </div>
              <div class="d-flex justify-center align-center col-4">
                <button>Add card</button>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="label">Payment history</div>
          </div>
          <div class="col-12 col-md-9">
            <div class="history customScroll">
              <div v-for="(payment, i) in payments" class="record" :key="i">
                <div class="normal">{{ payment.amount_paid }} FRW</div>
                <div class="normal">{{ payment.createdAt | formatDate }}</div>
                <div class="normal bold">{{ payment.method_used }}</div>
                <div class="normal">{{ payment.periodType === 'MONTH' ? 'Monthly' : 'Yearly' }} subscription</div>
              </div>
              <div v-if="!payments.length" class="d-flex justify-center align-center record no-payments">
                <div class="normal bold">
                  You have not yet made any payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-row>
    <payment-modal
        v-if="showModal"
        @closeModal="showModal = false"
    />
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import Apis from "@/services/apis";
// import {elapsedDuration} from "../../../services/global_functions";

export default {
  name: "PaymentsSettings",
  data: () => ({
    collegePlan: undefined,
    showModal: false,
    payments: []
  }),
  computed: {
    ...mapGetters('user', ['paymentStatus'])
  },
  components: {
    paymentModal: () => import("@/components/dashboard/paymentModal"),
  },
  methods: {
    fetchInfo() {
      Apis.get('college_payment_plans/current').then((res) => {
        this.collegePlan = res.data.data
      })
      Apis.get('account_payments').then((res) => {
        this.payments = res.data.data
      })
    }
  },
  created() {
    this.fetchInfo()
  }
};
</script>

<style lang="scss">
@import '../../assets/sass/imports/settings';
</style>