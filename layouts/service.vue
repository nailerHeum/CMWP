<template>
  <div class="container">
    <TopDrawer title="커뮤니티게시물모니터링" home_url="/service/intelligences/analytics" />
    <Aside :apps="apps" />
    <nuxt />
    <Footer :relative="false" />
  </div>
</template>

<script>
import TopDrawer from '~/components/TopDrawer.vue'
import Aside from '~/components/Aside.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    TopDrawer, Aside, Footer
  },
  beforeMount () {
    if ("ActiveXObject" in window || window.navigator.userAgent.indexOf('Edge') > 0) {
      this.$router.push('/ie_not_supported')
    }
  },
  data () {
    return {
      apps: [
        { index: "int-1", divider: false, icon: "fas fa-th-list", link: '/service/intelligences/list', title: '게시물보관함' },
        { index: "int-2", divider: true, icon: "fas fa-chart-pie", link: '/service/intelligences/analytics', title: '게시물분석' },
        { index: "mon-1", divider: false, icon: "fas fa-users", link: '/service/monitor/communities', title: '커뮤니티게시물모니터링' },
        { index: "mon-3", divider: true, icon: "fab fa-twitter", link: '/service/monitor/social', title: 'SNS게시물모니터링' },
        { index: "auth-admin", divider: false, icon: "fas fa-cog", link: '/admin/manage', title: '관리자', admin: this.$store.state.authUser.mode == '관리자' },
        { index: "auth-lg", divider: true, icon: "fas fa-sign-out-alt", link: '/', title: '로그아웃', logout: true },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/css/layout/service";
  @import "~assets/css/media";
  @import "~assets/css/components/swal2";
</style>

<style lang="scss">
  strong {
    font-weight: 700 !important;
  }
</style>
