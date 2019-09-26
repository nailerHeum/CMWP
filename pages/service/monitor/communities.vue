<template>
  <main>
    <div class="container-wrapper">
      <header data-role="app-title"><strong>커뮤니티</strong><br>키워드 모니터링</header>
      <div class="content" data-role="content-start">
        <div data-role="form">
          <div class="input">
            <input type="text" placeholder="검색 키워드를 입력하세요" required v-model="keyword" @keyup.delete.exact="clear" @keyup.enter.exact="crawl()" @focus="focus">
            <button class="button red" @click.exact="crawl()">
              <i class="fas fa-search" v-if="!this.lblSearchAll"></i>
              <p v-else>최신글 전체</p>
            </button>
          </div>
          <div class="status">
            <div class="uk-alert-primary uk-margin-small-top uk-padding-small" uk-alert>
              <a class="uk-alert-close" uk-close></a>
              <p class="uk-text-center">
                <span class="uk-text-bold">본 모니터링 프로그램은 아래 사이트에 대해 지원하고 있습니다.</span><br><br>
                <span v-for="site in sites" :key="site.index">
                  <span class="uk-badge uk-padding-small">{{ site.site }}</span>&nbsp;
                </span>
              </p>
            </div>
            <Message :icon="noticeIcon" :message="notice" :alert="noticeAlert" v-show="notice" />
            <Message icon="fas fa-exclamation-triangle" :message="error" alert="uk-alert-danger" v-show="error" />
            <Message icon="fas fa-check" :message="crawledDataCount + '개의 데이터를 수집하였습니다.'" alert="uk-alert-success" v-show="showCrawledResult" />
          </div>
        </div>
        <section data-role="communities-results" uk-filter="target: .filter">
          <ul class="uk-subnav uk-subnav-pill" v-if="showCrawledResult">
            <li class="uk-active" uk-filter-control><a href="#">전체</a></li>
            <li :key="cKey" v-for="cKey of Object.keys(this.comm)" :uk-filter-control="'[data-code=\'' + cKey + '\']'"><a href="#">{{ comm[cKey] }}</a></li>
          </ul>
          <article class="resultComm filter">
            <div :class="commCode" :data-code="commCode" :key="commCode" v-for="commCode of Object.keys(results)">
              <communities-result v-if="results[commCode]" :type="commCode" :name="comm[commCode]" :keyword="keyword" />
            </div>
          </article>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import Message from '~/components/Message.vue'
import CommunitiesResult from '~/components/CommunitiesResult.vue'
export default {
  layout: 'service',
  middleware: 'auth',
  components: {
    Message, CommunitiesResult
  },
  data () {
    return {
      sites: [
        { index: 0, site: '일간베스트(일베, 짤방)' },
        { index: 1, site: '클리앙' },
        { index: 2, site: '오늘의유머(사회, 시사)' },
        { index: 3, site: '와이고수' },
        { index: 4, site: 'MLB파크' },
        { index: 5, site: '에펨코리아' },
        { index: 6, site: '루리웹' },
        { index: 7, site: '뽐뿌' },
        { index: 8, site: '개드립' },
        { index: 9, site: '더쿠' },
        { index: 10, site: '워마드' },
      ],
      error: '',
      notice: '키워드를 입력하고 엔터키를 누르세요.',
      noticeIcon: 'fas fa-comment',
      noticeAlert: 'uk-alert-warning',
      keyword: '',
      comm: {
        'CT01': '일간베스트(일베)',
        'CT02': '클리앙',
        'CT03': '오늘의유머(사회)',
        'CT04': '와이고수',
        'CT05': 'MLB파크',
        'CT06': '에펨코리아',
        'CT07': '뽐뿌',
        'CT08': '일간베스트(짤방)',
        'CT09': '더쿠',
        'CT10': '루리웹',
        'CT11': '개드립',
        'CT12': '워마드',
        'CT13': '오늘의유머(시사)',
      },
      response: [],
      siteCnt: 0,
      showCrawledResult: false,
      lblSearchAll: true
    }
  },
  head () {
    return {
      title: '커뮤니티 게시물 키워드 모니터링 :: 커뮤니티게시물모니터링포털'
    }
  },
  mounted () {
    this.siteCnt = Object.keys(this.comm).length
  },
  computed: {
    crawledDataCount () {
      return this.$store.getters['communities/getDataCount']
    },
    results () {
      return this.$store.getters['communities/getResults']
    }
  },
  watch: {
    response (arr) {
      if (arr.length === this.siteCnt) {
        this.showCrawledResult = true
        swal.close()
      }
    },
    keyword (value) {
      if (value === '') {
        this.lblSearchAll = true
      } else {
        this.lblSearchAll = false
      }
    }
  },
  methods: {
    clear () {
      this.$store.dispatch('communities/clear')
      this.error = ''
      this.showCrawledResult = false
      this.noticeIcon = 'fas fa-comment'
      this.noticeAlert = 'uk-alert-warning'
      this.notice = '키워드를 입력하고 엔터키를 누르세요.'
    },
    crawl () {
      if (this.lblSearchAll || !(!this.keyword.trim() || this.keyword.length < 2)) {
        swal({ title: '데이터 수집 중입니다...', html: '수집이 완료되면 창이 자동으로 닫힙니다.', allowOutsideClick: false, width: '90vw' })
        swal.showLoading()
        this.error = ''
        this.notice = ''
        this.$store.dispatch('communities/setTypes', Object.keys(this.comm))
        this.$store.dispatch('communities/crawl',  { keyword: this.keyword, all: this.lblSearchAll })
        this.response = this.$store.getters['communities/getResponse']
      } else {
        this.$store.dispatch('communities/clear')
        this.notice = ''
        this.error = '검색어는 2글자 이상 입력해주시기 바랍니다.'
      }
    },
    focus () {
      if (this.crawledDataCount === 0) {
        this.notice = '키워드를 입력하고 엔터키를 누르세요.'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/css/components/main";
  .uk-subnav {
    background: #fff;
    padding: 5px;
    box-shadow: 0 15px 20px rgba(233,233,233,.12);
    margin-bottom: 1rem;
    margin-left: .05rem;
    > li {
      padding-left: 5px;
      > a {
        font-size: 1rem;
        font-weight: 100;
      }
    }
  }
</style>