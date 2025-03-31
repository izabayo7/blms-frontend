<template>
  <v-container fluid class="inner customScroll px-6 pl-lg-14 pr-md-2 pt-6">
    <div class="row">
      <div class="col-12">
        <iframe src="https://api.paymentwall.com/api/subscription?key=cf0cc980e0164b3bd5697ef5c2aadc4d&uid=user40012&widget=pw&amount=9.99&currencyCode=USD&ag_name=Kurious%20Learn%20Subscription&ag_external_id=product301&ag_type=subscription&ag_period_length=1&ag_period_type=month&ag_recurring=1&sign_version=3&email=cedric%40kurious.rw&sign=d5dea207690df96fbdfa44227e1270427ab3faa697801f5d48556290a6c55694" frameborder="0" width="750" height="800"></iframe>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "PersonalSettings",
  data: () => ({
  }),
  components: {
  },
  computed: {
  },
};
</script>