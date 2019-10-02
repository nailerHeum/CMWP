<template>
   <main>
        <div class="container-wrapper" v-if='chkError || getCount === 0'>
            <header data-role="app-title">커뮤니티 게시물<br><strong>수집데이터 분석</strong></header>
            <Message icon="fas fa-exclamation-triangle" alert="uk-alert-danger" message="데이터베이스 연결에 실패하였습니다." v-show="chkError" :class="{ 'valign-center': true, 'full-width': true }" />
            <Message icon="fas fa-exclamation-triangle" alert="uk-alert-danger" message="데이터가 없습니다." v-show="!chkError" :class="{ 'valign-center': true, 'full-width': true }" />
        </div>
        <div class="container-wrapper" v-else>
          <header data-role="app-title">커뮤니티 게시물<br><strong>수집데이터 분석</strong></header>
          <div class="grid grid-half">
            <ECharts
              v-for="option in options"
              :key="options.indexOf(option)"
              :options="option"
              :init-options="initOptions"
              autoresize
            />
          </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import Message from '~/components/Message.vue'
import ECharts from '~/components/ECharts.vue'

if (process.client) {
  require('echarts-wordcloud')
}
import '~/node_modules/echarts/lib/chart/bar'
import '~/node_modules/echarts/lib/chart/line'
import '~/node_modules/echarts/lib/chart/pie'
import '~/node_modules/echarts/lib/component/tooltip'
import '~/node_modules/echarts/lib/component/polar'
import '~/node_modules/echarts/lib/component/geo'
import '~/node_modules/echarts/lib/component/legend'
import '~/node_modules/echarts/lib/component/title'
import '~/node_modules/echarts/lib/component/visualMap'
import '~/node_modules/echarts/lib/component/dataset'

export default {
  layout: 'service',
  middleware: 'auth',
  components: {
    Message, ECharts
  },
  computed: {
    getCount () {
      return this.$store.getters['intelligences/getCount'].reduce((a, b) => a + b)
    },
    chkError () {
      return this.$store.getters['intelligences/chkError']
    }
  },
  head () {
    return {
      title: '커뮤니티게시물 특이동향 관리 :: 커뮤니티게시물모니터링포털'
    }
  },
  beforeMount () {
    this.$store.dispatch('intelligences/getData')
  },
  data () {
    return {
      options: [],
      initOptions: {
        renderer: 'canvas'
      }
    }
  },
  async asyncData () {
    let options = [
      (await axios.get('/api/v2/visualize/pie')).data,
      (await axios.get('/api/v2/visualize/wordcloud')).data,
      (await axios.get('/api/v2/visualize/line')).data,
      (await axios.get('/api/v2/visualize/bar')).data,
    ]
    return { options: options }
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/css/components/main";
  @import "~assets/css/layout/grid";
</style>
