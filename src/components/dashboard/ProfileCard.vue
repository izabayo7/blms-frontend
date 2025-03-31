<template>
    <div class="my-profile-card">
        <div class="profile-card-container">
            <div class="profile-information d-flex">
                <div class="profile-pic">
                    <img @click="logout" v-if="user.profile" :src="user.profile" alt="profile picture"/>
                    <v-avatar @click="logout" v-else size="50" class="avatar">
                        {{ `${user.sur_name} ${user.other_names}`| computeText }}
                    </v-avatar>
                </div>
                <div class="profile-names-email">
                    <p class="name">{{ `${user.sur_name} ${user.other_names}`}}</p>
                    <p class="email">{{ `${user.email}`}}</p>
                </div>
                <div class="profile-badge">
                    <verified-badge />
                </div>
            </div>
            <div class="profile-actions">
                <ul class="actions">
                    <li class="d-flex"> <div class="icon"> <v-icon>mdi-account</v-icon> </div><div class="content">My Account</div></li>
                    <li class="d-flex"> <div class="icon"> <v-icon>mdi-chart-box</v-icon> </div><div class="content">Reports</div></li>
                    <li class="d-flex"> <div class="icon"> <v-icon>mdi-message-bulleted </v-icon> </div><div class="content">Messages</div></li>
                </ul>
            </div>
            <div class="logout d-flex">
                <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="12.673" height="11.089" viewBox="0 0 12.673 11.089"><path id="Icon_open-account-logout" data-name="Icon open-account-logout" d="M4.752,0V1.584h6.336V9.5H4.752v1.584h7.92V0ZM3.168,3.168,0,5.544,3.168,7.92V6.336H9.5V4.752H3.168Z"/></svg></div>
                <div class="content">Logout</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import VerifiedBadge from "../reusable/ui/VerifiedBadge";

export default {
    name: "ProfileCard",
    components: {VerifiedBadge},
    computed:{
        ...mapGetters('user',['user'])
    },
    methods: {
        logout() {
            // clear the session
            this.$session.destroy();

            // reset the modules
            this.$store.dispatch("user/unsetUser");
            this.$store.commit("users/RESET_STATE");
            this.$store.commit("sidebar_navbar/RESET_STATE");
            this.$store.commit("quiz/RESET_STATE");
            this.$store.commit("quiz_submission/RESET_STATE");
            this.$store.commit("notification/RESET_STATE");
            this.$store.commit("modal/RESET_STATE");
            this.$store.commit("faculties/RESET_STATE");
            this.$store.commit("courses/RESET_STATE");
            this.$store.commit("colleges/RESET_STATE");
            this.$store.commit("chat/RESET_STATE");
            this.$store.commit("years/RESET_STATE");

            // redirect to login
            this.$router.push("/login");
            console.log('ark koko')
        },
    },
}
</script>

<style lang="scss" scoped>
.profile-card{
    .profile-card-container{
        background-color: $main;
        padding: 1rem;

        .profile-information{
            justify-content: center;
            align-items: center;

            .profile-pic{
                .v-avatar{
                    background-color: $primary;
                    color:$main;

                }

            }
            .profile-names-email{
                padding: .2rem 1.3rem;
                p{
                    &.name{
                        font-weight: 600;
                    }
                    &.email{
                        font-size: .85rem;
                        font-weight: 300;
                    }
                    margin:0;
                }
            }
            .profile-badge{
            }
        }

        .profile-actions{
            ul{
                padding:0;

                li{
                    padding:.5rem 0;

                    .icon{
                        padding-right: 2rem;

                        .v-icon{
                            font-size: 1.2rem;
                            color:$font;
                        }
                    }
                    .content{
                        color:$font;
                    }
                }
            }
        }

    }
}
</style>