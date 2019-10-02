<template>
   <main>
        <div class="container-wrapper" v-if='chkError || getCount === 0'>
            <header data-role="app-title">커뮤니티 게시물<br><strong>수집데이터 분석</strong></header>
            <Message icon="fas fa-exclamation-triangle" alert="uk-alert-danger" message="데이터베이스 연결에 실패하였습니다." v-show="chkError" :class="{ 'valign-center': true, 'full-width': true }" />
            <Message icon="fas fa-exclamation-triangle" alert="uk-alert-danger" message="데이터가 없습니다." v-show="!chkError" />
        </div>
        <div class="container-wrapper" v-else>
          <!-- <Message icon="fas fa-exclamation-triangle" alert="uk-alert-danger" message="시각화 모듈이 현재 실행 상태가 아닙니다." :class="{ 'valign-center': true, 'full-width': true }" /> -->
          <ECharts
            :options="pie"
            :init-options="initOptions"
            autoresize
          />
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import Message from '~/components/Message.vue'
import ECharts from '~/components/ECharts.vue'
import '~/node_modules/echarts/lib/chart/pie'

export default {
  layout: 'service',
  middleware: 'auth',
  components: {
    Message, ECharts
  },
  computed: {
    getCount () {
      return this.$store.getters['intelligences/getCount']
    },
    chkError () {
      return this.$store.getters['intelligences/chkError']
    }
  },
  beforeMount () {
  },
  head () {
    return {
      title: '커뮤니티게시물 특이동향 관리 :: 커뮤니티게시물모니터링포털'
    }
  },
  data () {
    return {
      initOptions: {
        renderer: 'canvas'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/css/components/main";
  .dashboard {
    width: calc(100vw - 50px);
    height: calc(100vh - 50px);
  }
</style>
