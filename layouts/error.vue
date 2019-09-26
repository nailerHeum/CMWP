<template>
  <section class="uk-section uk-section-default error uk-align-center">
    <div class="error">
       <img src="~assets/img/icon.png" alt="logo" class="logo" width="120" />
       <div class="divider"></div>
       <h1 class="info uk-text-danger" data-role="errorCode">{{ error.statusCode }}</h1>
    </div>
    <div class="uk-container uk-text-center">
      <div class="message">
          <span class="ko uk-text-lead">{{ codeDesc[error.statusCode] }}</span>
      </div>
      <nuxt-link to="/" class="uk-button uk-button-danger uk-margin-small"><i class="fas fa-home"></i> 처음으로</nuxt-link>
      <hr class="uk-divider-icon">
      <span id="serviceName">커뮤니티게시물모니터링포털</span>
    </div>
  </section>
</template>

<script>
export default {
  props: ['error'],
  data () {
    return {
      codeDesc: {
        "404": "페이지를 찾을 수 없습니다.",
        "500": "서버측 에러입니다."
      }
    }
  }
}
</script>

<style scoped lang="scss">
    @import "~assets/css/layout/error";
</style>
