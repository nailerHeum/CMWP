<template>
  <section class="uk-section uk-section-default error uk-align-center">
    <div class="error">
       <img src="~assets/img/icon.png" alt="logo" class="logo" width="120" />
       <div class="divider"></div>
       <h1 class="info uk-text-danger" data-role="errorCode">Waiting...</h1>
    </div>
    <div class="uk-container uk-text-center">
      <div class="message">
        <nuxt />
      </div>
      <a @click="logout" class="uk-button uk-button-danger uk-margin-small"><i class="fas fa-sign-out-alt"></i> 로그아웃</a>
      <hr class="uk-divider-icon">
      <span id="serviceName">커뮤니티게시물모니터링포털</span>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
    methods: {
        logout () {
        axios.post('/api/v2/auth/logout')
            .then(response => {
                this.$store.commit('SET_USER', null)
                location.href = '/'
            })
        }
    }
}
</script>

<style scoped lang="scss">
    @import "~assets/css/layout/error";
</style>
