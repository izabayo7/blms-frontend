<template>
  <v-app id="admin-regist">
      <v-row>
          <v-col class="col-md-4 col-12 image-side">
              <v-img src="http://127.0.0.1:5500/src/assets/images/Classroom-rafiki.png">
              </v-img>
          </v-col>
          <v-col class="col-md-8 col-12 form-side">
              <h1>ADMIN REGISTRATION</h1>
              <v-form class="regist-form">
                  
                  <label>Email</label>
                  <v-text-field
                    outlined
                    placeholder="someone@example.com"
                    required
                  />
                  <label>Phone number</label>
                  <v-text-field
                    outlined
                    placeholder="xxxx xxxx xxxx xxxx"
                    required
                  />
                  <label>National ID</label>
                  <v-text-field
                    outlined
                    required
                  />
                  <label>Gender</label>
                  <v-radio-group :mandatory="true" row>
                    <v-radio label="Male" value="male"></v-radio>
                    <v-radio label="Female" value="female"></v-radio>
                 </v-radio-group>
                 <label>Password</label>
                  <v-text-field
                    outlined
                    required
                  />
                  <label>Confirm Password</label>
                  <v-text-field
                    outlined
                    required
                  />
                  <v-btn class="create-btn">Create Account</v-btn>
              </v-form>
          </v-col>
      </v-row>
  </v-app>
</template>

<script>
export default {
     data: ()=> ({

     })

}
</script>

<style lang="scss" scoped>
#admin-regist{
    .image-side{
        .v-image {
            width: 370px;
            margin: 100px 35px 0;
            height: 332px;
            position: fixed;
        }
    }
    .form-side{
            background-color: #fafbfd;
            padding-left: 135px;
            h1{
                color: #ffd248;
            }
            .regist-form{
                .names{
                    .v-input {
                        max-width: 230px;
                    }
                    .last-name{
                        margin-left: -146px;
                    }
                }
                .v-input {
                    max-width: 480px;
                }
                button.create-btn{
                    background-color: #ffd248;
                    color: #fff;
                    width: 480px;
                    height: 50px;
                    font-size: 17px;
                    border-radius: 25px;
                }
            }
        }
    }
</style>