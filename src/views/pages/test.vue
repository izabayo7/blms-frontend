<template>
  <form action="#" @submit.prevent="makePayment">
    <div class="btn-wrapper">
      <input type="number" v-model.number="amount" />
      <button type="submit">Make Payment</button>
    </div>
  </form>
</template>

<script>
export default {
  name:"TEST",
  data() {
    return {
      amount: 200
    }
  },
  methods: {
    makePayment() {
      this.$launchFlutterwave({
        tx_ref: Date.now(),
        amount: this.amount,
        currency: 'RWF',
        country: "RW",
        payment_options: 'card,mobilemoneyrwanda',
        customer: {
          email: 'cedricizabayo7@gmail.com',
          phonenumber: '0786890328',
          name: 'Cedro desola'
        },
        callback: function(data) {
          // specified callback function
          console.log(data)
        },
        customizations: {
          title: 'My store',
          description: 'Payment for items in cart',
          logo: 'https://kurious.rw/_nuxt/img/web_logo.1b80144.png'
        }
      })
    }
  }
}
</script>