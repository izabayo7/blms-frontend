<template>
  <v-dialog id="kurious--dialog" v-model="visible" :persistent="!closable">
    <div class="dialog-body invite-users payment">
      <div class="row non-centered">
        <div class="title mx-auto">Payment flow</div>
      </div>
      <div class="row">
        <div class="col-12 col-md-7">
          <div class="role my-2">
            <div class="label">Plan</div>
            <select-ui
                label="Select user plan"
                name="role"
                id="plan"
                :options="options"
                @input="
                (e) => {
                  selected_plan = e;
                }
              "
            />
            <div class="hint normal">
              In this plan the college pays 2,49$ per month on a student
            </div>
          </div>
          <div class="role my-2 mt-6">
            <div class="label">Number of users</div>
            <input-ui
                class="email-input"
                :valid="true"
                placeholder="Enter the number of users"
                name="role"
                id="users"
                :value="total_users"
                type="number"
                @input="(e)=>{total_users = e}"
            />
          </div>
          <div class="role">
            <div class="row">
              <div class="col-6">
                <div class="role my-2">
                  <div class="label">Period type</div>
                  <select-ui
                      label="Select period type"
                      name="role"
                      id="period_type"
                      :options="periodTypes"
                      @input="
                (e) => {
                  periodType = e;
                }
              "
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="role my-2">
                  <div class="label">Period length</div>
                  <input-ui
                      class="email-input"
                      :valid="true"
                      placeholder="Enter the value"
                      name="role"
                      id="role"
                      :value="periodValue"
                      type="number"
                      @input="(e)=>{periodValue = e}"
                  />
                </div>
              </div>
            </div>
            <div class="hint normal">
              If you pay for the whole year,you will get a 20% discount
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5 d-flex align-center justify-center">
          <div class="bill">
            <div>Total amount is</div>
            <div class="amount">
              {{ amount }} frw
            </div>
          </div>
        </div>
      </div>
      <div class="row centered">
        <div class="col-12 send-container mt-12">
          <button class="add-email send cancel mr-4" @click="$emit('closeModal')">
            Cancel
          </button>
          <button class="add-email send" @click="saveChanges">
            Submit
          </button>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import InputUi from "@/components/reusable/ui/input-ui";
import Apis from "@/services/apis";
import SelectUi from "@/components/reusable/ui/select-ui";

export default {
  components: {InputUi, SelectUi},
  data() {
    return {
      options: ['HUGUKA', 'JIJUKA', 'MINUZA_STARTER', 'MINUZA_GROWTH', 'MINUZA_ACCELERATE'],
      periodTypes: ['MONTH', 'YEAR'],
      selected_plan: "",
      total_users: this.$store.state.user.paymentStatus.total_users,
      periodType: "",
      periodValue: 1,
      closable: false,
      amount: 0,
    };
  },
  watch: {
    periodType() {
      this.findAmount();
    },
    periodValue() {
      this.findAmount();
    },
    selected_plan() {
      this.findAmount();
    },
    total_users() {
      this.findAmount();
    },
  },
  computed: {
    visible() {
      return 1;
    },
  },
  methods: {
    findAmount() {
      Apis.create('account_payments/bill', {
        periodType: this.periodType,
        periodValue: this.periodValue,
        total_users: this.total_users,
      }).then((res) => {
        this.amount = res.data.data.amount
      })
    },
    async saveChanges() {
      Apis.update_user_password({
        current_password: this.current_password,
        new_password: this.confirm_password,
      }).then((res) => {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: res.data.message,
          status: res.data.status !== 201 ? "danger" : "success",
          uptime: res.data.status !== 201 ? 2000 : 5000,
        });
        if (res.data.status === 201)
          setTimeout(() => {
            this.$emit('closeModal')
          }, 5000)
      })
    },
  },
};
</script>
<style lang="scss">
@import '../../assets/sass/imports/dialog';
</style>
