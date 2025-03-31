<template>
    <div class="my-profile-card">
        <div class="profile-card-container">
            <div class="profile-information">
                <div class="profile-pic">
                    <img @click="logout" v-if="$store.state.user.user.profile" :src="$store.state.user.user.profile" alt="profile picture"/>
                    <v-avatar @click="logout" v-else size="50" class="avatar">
                        {{ `${$store.state.user.user.sur_name} ${$store.state.user.user.other_names}`| computeText }}
                    </v-avatar>
                </div>
                <div class="profile-names-email"></div>
                <div class="profile-badge">
                    <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="17.424" height="21.296" viewBox="0 0 17.424 21.296"><path id="Icon_material-verified-user" data-name="Icon material-verified-user" d="M13.212,1.5,4.5,5.372V11.18c0,5.372,3.717,10.4,8.712,11.616,4.995-1.22,8.712-6.244,8.712-11.616V5.372ZM11.276,16.988,7.4,13.116l1.365-1.365,2.507,2.5,6.379-6.379L19.02,9.244Z" transform="translate(-4.5 -1.5)" fill="#2680eb"/></svg></div>
                </div>
            </div>
            <div class="profile-actions">
                <ul class="actions">
                    <li> <div class="icon"> <v-icon>mdi-chevron-down</v-icon> </div><div class="content">My Account</div></li>
                    <li> <div class="icon"> <v-icon>mdi-chevron-down</v-icon> </div><div class="content">Reports</div></li>
                    <li> <div class="icon"> <v-icon>mdi-chevron-down</v-icon> </div><div class="content">Messages</div></li>
                </ul>
            </div>
            <div class="logout">
                <div class="icon"><v-icon>mdi-chevron-down</v-icon></div>
                <div class="content">Logout</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileCard",
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

<style scoped>

</style>