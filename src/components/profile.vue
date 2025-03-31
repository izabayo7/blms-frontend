<template>
  <v-container>
      <v-row
        id="liveClass"
      >
          <v-col
            class="col-12 col-md-4 course-content pa-md-16"
          >
            <v-avatar size="245" class="user-profile ml-2 mt-6 d-block">
                <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="avatar"
                >
            </v-avatar>
            <v-btn color="#FFD248" class="white--text mt-6 ml-4 px-12 py-7 " @click="pickfile()">Change profile pic</v-btn>
              <input
                ref="file"
                type="file"
                id="picture"
                hidden
                @change="handleFileUpload()"
              >
          </v-col>
          <v-col
            class="col-8 hidden-sm-and-down chapters pt-md-12"
          >
            <v-tabs
              v-model="tab"
            >
              <v-tab
                v-for="(tab, i) in tabs"
                :key="i"
              >
                {{ tab.tab }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="(tab, i) in tabs"
                :key="i"
              >
                <v-card flat>
                  <v-card-text>
                    <div v-if="tab.tab === 'General Info'" class="generalInfo">
                      <h4>Sur name</h4>
                      <v-text-field
                        v-model="user.surName"
                        class="profile-input"
                        type="text"
                        solo
                        required
                      />
                      <h4>Other names</h4>
                      <v-text-field
                        v-model="user.otherNames"
                        class="profile-input"
                        type="text"
                        solo
                        required
                      />
                      <h4>Email</h4>
                      <v-text-field
                        v-model="user.email"
                        class="profile-input"
                        solo
                        required
                      />
                      <h4>National id</h4>
                      <v-text-field
                        v-model="user.nationalId"
                        class="profile-input"
                        type="number"
                        solo
                        required
                      />
                      <h4>Phone number</h4>
                      <v-text-field
                        v-model="user.phone"
                        class="profile-input"
                        type="text"
                        solo
                        required
                      />

                      <v-btn color="#3CE970" class="white--text mt-6 ml-4 px-12 py-7 " @click="updateProfile()">Save Changes</v-btn>
                      <v-btn text class="mt-6 ml-4 px-12 py-7 ">Cancel</v-btn>
                    </div>
                    <div v-else class="generalInfo">
                      <h4>Old password</h4>
                      <v-text-field
                        v-model="oldPassword"
                        type="password"
                        class="profile-input"
                        solo
                        required
                      />
                      <h4>New Password</h4>
                      <v-text-field
                        v-model="newPassword"
                        class="profile-input"
                        :rules="passwordRules"
                        type="password"
                        solo
                        required
                      />
                      <h4>Confirm Password</h4>
                      <v-text-field
                        v-model="confirmNewPassword"
                        :rules="passwordMatch"
                        class="profile-input"
                        type="password"
                        solo
                        required
                      />
                      <v-btn color="#3CE970" class="white--text mt-6 ml-4 px-12 py-7 " @click="updateProfile()">Save Changes</v-btn>
                      <v-btn text class="mt-6 ml-4 px-12 py-7 ">Cancel</v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import axios from 'axios' 

export default {
    name: 'UserProfile',
    data:() =>({
        tab: null,
        tabs: [
          { tab: 'General Info', content: 'Tab 1 Content' },
          { tab: 'Security', content: 'Tab 2 Content' },
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (/([ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/.test(v) && /(?=.*\d)/.test(v) && /(?=.*[A-Z])/.test(v) && /(?=.*[a-z])/.test(v)) || 'Password must contain uppercase characters, lowercase characters, numbers and symbols',
          v => (v && v.length >= 8) || 'Password must atleast have 8 characters',
          v => (v && v.length <= 15) || 'Password must not exceed 15 characters',
        ],
        passwordMatch: [
          v => (v && v === this.newPassword ) || 'confirm password must match with new password',
        ],
        showActions: false,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    }),
    computed:{
      user () {
        const user = JSON.stringify(this.$store.state.user)
        return JSON.parse(user)
      },
    },
    methods: {
      comparePassword () {
        this.passwordMatch = this.newPassword === this.confirmNewPassword
      },
      pickfile () {
        document.getElementById('picture').click()
      },
      handleFileUpload () {
        this.user.profile = this.$refs.file.files[0]
      },
      async updateProfile () {
        if (this.oldPassword !== '') {
          this.passwordValid = await bcrypt.compare(this.oldPassword, this.$store.state.user.password)
          if (!this.passwordValid) {
            alert('old password is incorrect')
            return 0
          }
        }
        const category = this.$store.state.user.category === 'SuperAdmin' ? 'superAdmin' : this.$store.state.user.category.toLowerCase()
        const formData = new FormData()

        formData.append('surName', this.user.surName)
        formData.append('otherNames', this.user.otherNames)
        formData.append('gender', this.user.gender)
        formData.append('nationalId', this.user.nationalId)
        formData.append('phone', this.user.phone)
        formData.append('email', this.user.email)

        if (this.newPassword !== '') {
          formData.append('password', this.newPassword)
        }

        if (this.$store.state.user.category === 'Student') {
          formData.append('DOB', this.user.DOB)
        }
        if (this.$store.state.user.category !== 'SuperAdmin') {
          formData.append('college', this.user.college)
        }

        if (this.user.profile) {
          formData.append('profile', this.user.profile)
        }
        
        const response = await axios.put(`http://161.35.199.197:7070/kurious/${category}/${this.$store.state.user._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        if (response.data._id) {
            // success message needed
          const updatedUser = {
            _id: response.data._id,
            surName: response.data.surName,
            otherNames: response.data.otherNames,
            gender: response.data.gender,
            nationalId: response.data.nationalId,
            phone: response.data.phone,
            email: response.data.email,
            password: response.data.password,
            category: this.$store.state.user.category,
          }

          if (response.data.profile) {
            updatedUser.profile = response.data.profile
          }

          if (this.$store.state.user.category !== 'SuperAdmin') {
            // updatedUser.isActive = response.data.isActive
            updatedUser.college = response.data.college
          }

          if (this.$store.state.user.category === 'Student') {
            // for non student
            updatedUser.DOB = response.data.DOB
          }

          const ONE_DAY = 60 * 60 * 24
          this.$session.remove('jwt')
          this.$session.set('jwt', jwt.sign(updatedUser, 'KurichTech01', { expiresIn: ONE_DAY }))
          this.$store.dispatch('setUser', updatedUser)
        } else {
          //  error message needed
        }
      },
    }
}
</script>