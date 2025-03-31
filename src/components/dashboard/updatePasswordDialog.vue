<template>
  <v-dialog id="kurious--dialog" v-model="visible" :persistent="!closable">
    <div class="dialog-body invite-users">
      <div class="pre-send">
        <div class="mx-auto centered">
          <div class="title">Update password</div>
          <div class="role my-2 mt-6">
            <input-ui
                class="email-input"
                :valid="true"
                placeholder="Enter your current password"
                name="role"
                id="role"
                :value="current_password"
                type="password"
                @input="updateCurrentPassword"
            />
          </div>
          <div class="role my-2">
            <input-ui
                class="email-input"
                placeholder="Enter new password"
                :valid="errors.passwordError === ''"
                name="role"
                id="newPass"
                type="password"
                :value="new_password"
                @input="updatePassword"
            />
          </div>
          <div class="hint">
            {{ errors.passwordError }}
          </div>
          <div class="d-flex my-1">
            <input-ui
                class="email-input"
                placeholder="Confirm new password"
                :valid="errors.confirmPasswordError === ''"
                name="confirm"
                id="confirm"
                type="password"
                :value="confirm_password"
                @input="updateConfirmPassword"
            />
          </div>
          <div class="hint">
            {{ errors.confirmPasswordError }}
          </div>
          <div class="send-container mt-12">
            <button class="add-email send cancel mr-4" @click="$emit('closeModal')">
              Cancel
            </button>
            <button class="add-email send" @click="saveChanges">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import InputUi from "@/components/reusable/ui/input-ui";
import Apis from "@/services/apis";

export default {
  components: {InputUi},
  data() {
    return {
      options: ["Principal", "Instructor", "Student"],
      current_password: "",
      new_password: "",
      confirm_password: "",
      errors: {
        passwordError: "",
        confirmPasswordError: ""
      },
      closable: false,
    };
  },
  computed: {
    visible() {
      return 1;
    },
  },
  methods: {
    updateCurrentPassword(value) {
      this.current_password = value
    },
    updatePassword(value) {
      this.new_password = value
      this.validatePassword()
    },
    updateConfirmPassword(value) {
      this.confirm_password = value
      this.validateConfirmPassword();
    },
    async validatePassword() {
      const str = this.new_password
      if (!str.length)
        return this.errors.passwordError = "password is required"

      if (!/^(?=.*[a-z])/.test(str))
        return this.errors.passwordError = "password must contain a lowercase letter"
      if (!/^(?=.*[A-Z])/.test(str))
        return this.errors.passwordError = "password must contain an uppercase letter"
      if (!/^(?=.*[0-9])/.test(str))
        return this.errors.passwordError = "password must contain a number"
      if (!/^(?=.{8,})/.test(str))
        return this.errors.passwordError = "password must have atleast 8 characters"

      this.errors.passwordError = ""
    },
    validateConfirmPassword() {
      if (this.confirm_password.length)
        if (this.new_password === this.confirm_password)
          this.errors.confirmPasswordError = ""
        else
          this.errors.confirmPasswordError = "Passwords must match"
      else
        this.errors.confirmPasswordError = "Confirmation password is required"
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
