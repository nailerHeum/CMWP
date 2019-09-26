<template>
    <div class="result" data-role="social-results">
        <ul class="cards">
            <li class="card" v-for="item in data" :key="item.details.id">
              <div class="uk-card-badge uk-label">트위터</div>
               <a target="_blank">
                  <div class="user">
                     <figure @click="showUserInfo(item.details.user)">
                         <img :src="item.details.user.profile_image_url" :alt="item.details.user.name">
                         <figcaption>{{ item.details.user.name }}</figcaption>
                     </figure>

                  </div>
                   <div class="info">
                        <header>{{ item.details.title }}</header>
                        <span>{{ item.details.author }}</span>
                        <p data-role='content'>{{ item.details.text }}</p>
                        <div data-role='date'>{{ calcDate(item.details.created_at) }}</div>
                    </div>
               </a>
               <div class="button-group">
                   <button class="save" @click="saveInt(item)">게시물 저장</button>
               </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  computed: {
    data () {
      return this.$store.getters['social/getData']
    }
  },
  methods: {
    calcDate (date) {
      return new Date(date).toLocaleString()
    },
    showUserInfo (user) {
     swal({
        title: `${user.name}(@${user.screen_name})`,
        imageUrl: user.profile_image_url.replace('_normal', '_200x200'),
        imageWidth: 200,
        imageHeight: 200,
        confirmButtonText: '확인',
        width: 800,
        html: `<span>
                        <i class="far fa-compass"></i> ${user.location}
                     </span>&nbsp;&nbsp;|&nbsp;&nbsp;
                     <span>
                        <i class="fab fa-twitter"></i> 트윗 ${user.statuses_count}
                     </span>&nbsp;&nbsp;|&nbsp;&nbsp;
                     <span>
                        <i class="far fa-sticky-note"></i> ${user.description}
                     </span>`,
        footer: `<a target=_blank href='https://twitter.com/${user.screen_name}'>Visit this Tweeter's</a>`
     })
    },
    saveInt (item) {
      Swal.queue([
        {
          title: '유형을 선택하세요',
          input: 'select',
          confirmButtonText: '선택',
          cancelButtonText: '취소',
          inputOptions: {
            'trend': '특이동향',
            'policy': '법규위반의심'
          },
          inputPlaceholder: '유형 선택(특이동향 혹은 법규위반의심)',
          showCancelButton: true,
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value === 'trend' || value === 'policy') {
                resolve()
              } else {
                resolve('옵션을 선택하세요.')
              }
            })
          }
        },
        {
          title: '저장',
          input: 'textarea',
          inputPlaceholder: '상세 내용을 입력해주세요.',
          showCancelButton: true,
          showLoaderOnConfirm: true,
          confirmButtonText: '저장',
          cancelButtonText: '취소',
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value.length > 0) {
                resolve()
              } else {
                resolve('내용을 입력하세요.')
              }
            })
          }
        }
      ]).then(result => {
        item.saved_at = new Date().toISOString()
        item.title = item.details.text
        item.link = ''
        if (item.details.entities.urls.length > 0) {
          item.link = item.details.entities.urls[0].expanded_url
        }
        if ('media' in item.details.entities) {
          item.link = item.details.entities.media[0].expanded_url
        }
        item.author = `@${item.details.user.screen_name}`
        item.date = new Date(item.details.created_at).toISOString()
        item.content = result.value[1]
        item.type = result.value[0]
        swal({ title: '저장 중...', html: '인터넷 서비스 상태에 따라 처리시간이 소요될 수 있습니다.', allowOutsideClick: false, width: '90vw' })
        swal.showLoading()
        axios.post(`/api/v2/intelligences/`, { id: item.details.id, item: item })
          .then(response => {
            swal.close()
            if (item.link !== '') {
              swal({ title: '페이지 스크린샷 저장 중...', html: '인터넷 서비스 상태에 따라 처리시간이 소요될 수 있습니다.', allowOutsideClick: false, width: '90vw' })
              swal.showLoading()
              axios.post(`/api/v2/service/screenshot`, { id: btoa(item.link), item: item })
                .then(sRes => {
                  swal.close()
                  if (response.status === 200 && response.data.result === 'created') {
                    swal('저장 완료', '저장되었습니다.', 'success')
                  } else if (response.status === 200 && response.data.result === false) {
                    swal('저장하지 않음', '이미 저장된 내용입니다.', 'warning')
                  }
                })
            } else {
              if (response.status === 200 && response.data.result === 'created') {
                swal('저장 완료', '저장되었습니다.', 'success')
              } else if (response.status === 200 && response.data.result === false) {
                swal('저장하지 않음', '이미 저장된 내용입니다.', 'warning')
              }
            }
            if (response.dismiss === Swal.DismissReason.backdrop) {}
          }).catch(error => {
            swal(error, '저장 중 에러 발생', 'error')
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/css/components/social";
  @import "~assets/css/media";
</style>
