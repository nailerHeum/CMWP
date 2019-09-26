<template>
   <main>
        <div class="container-wrapper">
            <header data-role="app-title"><strong>SNS</strong><br>키워드 모니터링</header>
            <div class="content" data-role="content-start">
                <div data-role="form">
                    <div class="input">
                      <input full-line-width type="text" placeholder="검색 키워드를 입력하세요" required v-model="keyword" @keyup.exact="clear" @keyup.enter.exact="searchKeyword" @keyup.delete.exact="clear">
                    </div>
                </div>
                <div class="status">
                  <Message :icon="noticeIcon" :message="notice" :alert="noticeAlert" v-show="notice" />
                  <Message icon="fas fa-exclamation-triangle" :message="error" alert="uk-alert-danger" v-show="error" />
                  <Message icon="fas fa-check" :message="getCount + '개가 수집되었습니다.'" alert="uk-alert-success" v-show="getResult" />
                </div>
                <social-result v-if="getResult" />
            </div>
        </div>
    </main>
</template>

<script>
import Message from '~/components/Message.vue'
import SocialResult from '~/components/SocialResult.vue'
export default {
  layout: 'service',
  middleware: 'auth',
  components: {
    Message, SocialResult
  },
  computed: {
    getCount () {
      if (this.$store.getters['social/getCount'] > 0) {
        this.notice = ''
      }
      return this.$store.getters['social/getCount']
    },
    getResult () {
      return this.$store.getters['social/getResult']
    }
  },
  data () {
    return {
      keyword: '',
      error: '',
      notice: '키워드를 입력하고 엔터키를 누르세요.',
      noticeIcon: 'fas fa-comment',
      noticeAlert: 'uk-alert-warning',
      srvs: {
        'ST01': '트위터',
        'ST02': '페이스북'
      }
    }
  },
  head () {
    return {
      title: 'SNS 게시물 모니터링 :: 커뮤니티게시물모니터링포털'
    }
  },
  methods: {
    clear () {
      this.error = ''
      this.noticeIcon = 'fas fa-comment'
      this.noticeAlert = 'uk-alert-warning'
      this.notice = '키워드를 입력하고 엔터키를 누르세요.'
      this.$store.dispatch('social/clear')
    },
    searchKeyword () {
      if (!this.keyword.trim() || this.keyword.length > 500) {
        this.notice = ''
        this.error = '키워드가 비어있거나 500자 이상일 경우 검색이 불가합니다.'
      } else {
        this.$store.dispatch('social/clear')
        this.error = ''
        this.noticeIcon = 'fas fa-circle-notch fa-spin'
        this.noticeAlert = 'uk-alert-primary'
        this.notice = '검색을 시작합니다. 결과 출력까지 잠시만 기다려주세요.'
        this.$store.dispatch('social/searchTwitter', this.keyword)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/css/components/main";
</style>
