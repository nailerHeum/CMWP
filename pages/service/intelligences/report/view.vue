<template>
  <main>
     <section class="pdf-viewer" style="width: 100%; height: 100vh;" v-if="getResponse">
        <object :data="pdfViewer" type="application/pdf" width="100%" height="100%">
              <embed :src="pdfViewer" type="application/pdf" />
        </object>
     </section>
     <div class="container-wrapper" v-else>
         <header data-role="app-title"><strong>커뮤니티게시물 보고서</strong><br>미리보기</header>
         <Message icon="fas fa-exclamation" alert="uk-alert-danger" message="잘못된 접근입니다." v-show="noData" />
         <Message icon="fas fa-circle-notch fa-spin" alert="uk-alert-success" message="데이터 뷰어 로딩중입니다. 잠시만 기다려주세요." v-show="!noData" />
     </div>
  </main>
</template>

<script type="text/javascript">
import Message from '~/components/Message.vue'
export default {
  layout: 'service',
  middleware: 'auth',
  components: {
    Message
  },
  beforeMount () {
    this.$store.dispatch('viewer/getData', this.$route.query.id)
  },
  head () {
    return {
      title: '커뮤니티게시물 보고서 :: 커뮤니티게시물모니터링포털'
    }
  },
  data () {
    return {
      response: false
    }
  },
  watch: {
    response (val) {
      swal({ title: 'PDF 변환중입니다.', html: '잠시만 기다려주세요.', width: '90vw', allowOutsideClick: false, timer: 6000 })
      swal.showLoading()
    }
  },
  computed: {
    getResponse () {
      this.response = this.$store.getters['viewer/getResponse']
      return this.response
    },
    noData () {
      return !this.$store.getters['viewer/getExists']
    },
    pdfViewer () {
      return `/api/v2/intelligence/viewer/${this.$store.getters['viewer/getID']}`
    }
  },
}
</script>

<style scoped lang="scss">
  @import "~assets/css/components/main";
</style>
