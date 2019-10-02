<template>
   <main>
        <div class="container-wrapper" v-if='chkError || getCount === 0'>
            <header data-role="app-title">커뮤니티 게시물<br><strong>수집데이터 분석</strong></header>
            <Message icon="fas fa-exclamation-triangle" alert="uk-alert-danger" message="데이터베이스 연결에 실패하였습니다." v-show="chkError" :class="{ 'valign-center': true, 'full-width': true }" />
            <Message icon="fas fa-exclamation-triangle" alert="uk-alert-danger" message="데이터가 없습니다." v-show="!chkError" :class="{ 'valign-center': true, 'full-width': true }" />
        </div>
        <div class="container-wrapper" v-else>
          <header data-role="app-title">커뮤니티 게시물<br><strong>수집데이터 분석</strong></header>
          <ECharts
            :options="options"
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

import 'echarts-liquidfill'
import 'echarts-wordcloud'

import '~/node_modules/echarts/lib/chart/bar'
import '~/node_modules/echarts/lib/chart/line'
import '~/node_modules/echarts/lib/chart/pie'
import '~/node_modules/echarts/lib/chart/map'
import '~/node_modules/echarts/lib/chart/radar'
import '~/node_modules/echarts/lib/chart/scatter'
import '~/node_modules/echarts/lib/chart/effectScatter'
import '~/node_modules/echarts/lib/component/tooltip'
import '~/node_modules/echarts/lib/component/polar'
import '~/node_modules/echarts/lib/component/geo'
import '~/node_modules/echarts/lib/component/legend'
import '~/node_modules/echarts/lib/component/title'
import '~/node_modules/echarts/lib/component/visualMap'
import '~/node_modules/echarts/lib/component/dataset'
import '~/node_modules/echarts/map/js/world'

import 'zrender/lib/svg/svg'

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
      options: {},
      initOptions: {
        renderer: 'svg'
      }
    }
  },
  async asyncData () {
    let options = await axios.get('/api/v2/visualize/pie')
    return { options: options.data }
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
