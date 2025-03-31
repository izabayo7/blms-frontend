<template>
    <v-app id="edit-page">
        <v-form class="edit-form">
            <h2>Edit School Details</h2>
            <label>School Name</label>
            <v-text-field
                outlined
                solo
                dense
                value="African Leadership University"
            ></v-text-field>
            <label>Email</label>
            <v-text-field
                outlined
                solo
                dense
                value="alu@gmail.com"
            ></v-text-field>
            <label>School Phone</label>
            <v-text-field
                outlined
                solo
                dense
                value="0788324571"
            ></v-text-field>
            <label>School Location</label>
            <v-text-field
                outlined
                solo
                dense
                value="Kicukiro"
            ></v-text-field>
            <v-btn color="success" class="text--white">Save Changes</v-btn>
            <v-btn color="error" class="text--white" @click="$router.push(`/school-details`)">Cancel</v-btn>
        </v-form>
    </v-app>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
#edit-page{
    .edit-form {
        width: 470px;
        margin: 50px auto;
        h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        button.text--white.v-btn.v-btn--contained.theme--light.v-size--default.success {
            margin-left: 80px;
        }
        button.text--white.v-btn.v-btn--contained.theme--light.v-size--default.error {
            margin-left: 30px;
        }
    }
}
</style>