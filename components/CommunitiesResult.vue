<template>
    <section>
        <div class="commInfo flex uk-card uk-card-default uk-card-body" :data-comm-type="type">
          <span class="uk-label uk-label-danger uk-position-small uk-position-top-right">{{ name }}</span>
          <div class="flex-half flex-left">
            <img class="uk-margin-right" :src="this.commLogos[type]['src']" :alt="type" :style="{ 'max-width': '200px', 'max-height': '100px', background: this.commLogos[type]['background'] }">
          </div>
          <div class="flex flex-half flex-right">
            <span>{{ count }}</span>
          </div>
        </div>
        <table class="uk-table uk-table-divider uk-table-hover uk-table-striped uk-table-small uk-table-middle uk-table-responsive">
          <thead>
            <tr>
              <th class="uk-table-shrink">카테고리</th>
              <th class="uk-table-expand">제목</th>
              <th class="uk-width-small uk-table-shrink">닉네임</th>
              <th class="uk-width-small uk-table-shrink">작성일</th>
              <th class="uk-width-small uk-text-nowrap">작업</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.link">
              <td data-role="category" class="uk-width-small">{{ item.category }}</td>
              <td data-role="title" class="uk-text-truncate"><a :data-link="item.link" uk-tooltip="title: 누르면 게시물 내용을 볼 수 있습니다.; pos: bottom-left;" @click="postPreview(item)">{{ item.title.trim() }}</a></td>
              <td data-role="title">{{ item.author }}</td>
              <td data-role="date">{{ new Date(item.date).toLocaleDateString() }}</td>
              <td data-role="works">
                <button class="uk-button uk-button-default uk-text-nowrap" @click='saveInt(item, item.link)'>
                  <i class="fas fa-save"></i>
                  <span class="btn-desc">게시물 저장</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      commLogos: {
        'CT01': {
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ilbe_logo.svg/150px-Ilbe_logo.svg.png',
          background: 'transparent'
        },
        'CT02': {
          src: 'https://image.winudf.com/v2/image/Y29tLm1vYmlsZS5hcHAuY2xpZW5faWNvbl8xNTIwMTU0ODA3XzAzMw/icon.png?w=170&fakeurl=1&type=.png',
          background: 'transparent'
        },
        'CT03': {
          src: 'http://m.todayhumor.co.kr/images/toplogo/toplogo_m.gif',
          background: 'transparent'
        },
        'CT04': {
          src: 'https://www.ygosu.com/images/logo_2014.gif',
          background: 'transparent'
        },
        'CT05': {
          src: 'http://image.donga.com/challenge/mlbpark/images/img_logo.gif',
          background: 'transparent'
        },
        'CT06': {
          src: 'https://file.namu.moe/file/ecd3b3ecce12101fe3c639fcf3a00bd42d5412ded5c14dbcb43949d2ddbabb53d78b4d474b7dac0b3de06ff13b4bb276078f7b408d97314091e64aed132a5b8ead2c2d91b4c9b0d2897853264cc21d2d128f47cb76bc05b3786ac929a2d0f1c1',
          background: 'transparent'
        },
        'CT07': {
          src: 'http://img.ppomppu.co.kr/images/main/201111/logo_small.gif',
          background: 'transparent'
        },
        'CT08': {
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ilbe_logo.svg/150px-Ilbe_logo.svg.png',
          background: 'transparent'
        },
        'CT09': {
          src: 'https://pbs.twimg.com/profile_images/660745582537928705/Q0A3ogh7_400x400.jpg',
          background: 'transparent'
        },
        'CT10': {
          src: 'https://img.ruliweb.com/img/2016/ruli_400x210.png',
          background: 'transparent'
        },
        'CT11': {
          src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfMAAABlCAMAAABumfqTAAAAZlBMVEX///8AAADKysr09PRcXFyYmJjq6uqGhoagoKD39/fW1tY0NDQ4ODjOzs6Pj48ODg7i4uJGRkZVVVUjIyPExMQdHR0XFxfZ2dmBgYGkpKQRERFJSUmbm5uLi4tTU1NhYWFra2srKyt0VOAOAAAEH0lEQVR4nO2da1fiMBRFC+pIdSqI+EBH0f//J2ctU5oE7iWPJtzQnP2RFe86OZviTGlr0wAAAAAAgInRbuYWm6vppunK2OQ4hoY20SP+zA54bhMGHJ3mKWWap2HsXcKp56XV3UTPOGpZVPpxmpTS7+H8l+OWJaUTaRJKh3MF0bKg9Lxp4FxBtSwnPW8aOFeQLc9ehP5hS6dJJR3OFXTLs3cZ6UyalzTS4VzBtCwknUuT5nMHzhVGyyur5qWEdCPNq/0WTHGkw7nCaLm5E5dupumSp4FzhdnygfTZ+aWfSLMcf6T/wPkvVsvi0k+lGX+kf697PlYJssqQ3rm09LLSlEgG58I1l5WmRHI4l625rDQlksW5aM1lpSmRPM4lay4rTYlkct68itVMpYF0k1zOD6R3CaKOSXMnlaZEsjm3pUs7F0tTIvmcWzWLO5dKUyIZnZs1my23V07MKe7V9hnVc6Vp4odwBI9xr2+J5UZDrXe2A7iWmw+y5X8zJ+aQZ+fqN780j2Sam7A0L8Or5vn2h7AhHMFj3p3rzW5W3KII6YEtb8N29te5+nZMmkVYGvp7NfcbZ+lTZPCYe+cPfBqr4bwHzuHckQbOFXAO5wNwPgDnLswhcM6PgfOoNHB+Xuef1uoreox2bl+NpMckcv7gk8bl/IbJEujcc4xOw3VjV9zDNRRAtHMvWdq5fdXhImyM27nXGJdz+42jj6xA555jdJpX63V92otynvPcK5zDeQ+cc8B5D5zD+R44h/PINHAeBZzLOw/5vxqch40p1TkHnBNp4DyKSTpngHMFnMP5AJxzsmjgvAfO4XwPnMN5ZBo4jwLO4XwAzjlZNBmc2/d7KOCcGcNQqvPO596lHjifhnP7O5bTwDmcxwDncD4A53CugHMOOO+BczjfA+dwHplGwvnua/+k4PXjKn5MAucqQ8TjrgOfLRJ975K9r+T3LiVx7nXTkfm4lFEfF9z1cKcxnCvG3a+2uzbY6Yev0M7vreVrWpZ2/mEN16+zzn3SJHZub+mLlqX/GGMy51/XJOstsYfEzjlk7kv1SZPYOUdu5xzUpuCcGcNwac4d36sp4PwkcK6AczgngHNzCJwTmNPhHM6PgXMeOCfSwHku53NjeeAzfp+cq0c512moS8eO0KfQwpxbWzJfpx8VbKta0WPCn3+sSOG83cxdmFNXztXmO6Tp6CXd2xD5Nk0ar9OXHTlEO/9m4rJb8slibIlLw0Fu6qChjc/Gi4A73y4B96EM0hL4izgrcH4e4Lw+4Lw+4Lw+4Lw+4Lw+4Lw+4Lw+4Lw+4Lw+4Lw+cL59umwXJNsdnE+Wn5kLOJ8aodfJSADnaYHz+oDz+oDz+oDz+rgs5+TfqgSBXILz+c2ey7mGtGR+nM69LkwHF8TiwQWOLQAAiOA/4B1+zKlG8+UAAAAASUVORK5CYII=',
          background: '#0054A6'
        },
        'CT12': {
          src: 'https://womad.life/assets/wm_logo_1-143848808c6f595a02265a86eb293aed2ab0ca44b50a95d940f6fc1ddcd8ccae.png',
          background: 'transparent'
        },
        'CT13': {
          src: 'http://m.todayhumor.co.kr/images/toplogo/toplogo_m.gif',
          background: 'transparent'
        },
      }
    }
  },
  props: ['type', 'name', 'keyword'],
  computed: {
    data () {
      return this.$store.getters['communities/getCrawlData'].filter(item => item.meta.code === this.type).reduce(function (a, b) {
        if (a.indexOf(b) < 0)
          a.push(b)
        return a
      }, [])
    },
    count () {
      return this.$store.getters['communities/getEachCount'][this.type]
    },
    commLogoSrc () {
      return this.commLogos[this.type]
    }
  },
  methods: {
    postPreview (item) {
      let resFunc = (response) => {
        swal.close()
        if (response.data.data.content === null) {
          swal({
            width: '90vw',
            title: item.title,
            confirmButtonText: `<i class='fas fa-check-circle'></i> 확인`,
            html: '<hr><strong>내용이 없거나 삭제된 게시물입니다.</strong>',
            footer: `<a target=_blank href='${item.link}' class='uk-text-bold uk-text-danger'>해당 게시물 접속</a>`
          })
        } else {
          swal({
            width: '90vw',
            title: item.title,
            heightAuto: false,
            confirmButtonText: `<i class='fas fa-check-circle'></i> 확인`,
            html: '<hr>' + response.data.data.content,
            footer: `<a target=_blank href='${item.link}' class='uk-text-bold uk-text-danger'>해당 게시물 접속</a>`
          })
        }
      }
      let errFunc = (error) => {
        swal('Error',`에러 : ${error}`, 'error')
      }
      if (item.link === '') {
        swal('에러', '삭제되어 볼 수 없는 게시물이거나 알 수 없는 에러가 발생하였습니다.', 'error')
      } else {
        swal({ title: '데이터 수신중 ...', html: '미리보기를 준비하고 있습니다.', allowOutsideClick: false, width: '90vw' })
        swal.showLoading()
        var url = ''
        try {
          url = new URL(item.link)
        } catch (e) {
          url = ''
          swal('에러!', e.toString(), 'error')
        }
        if (['CT01', 'CT06', 'CT08', 'CT09', 'CT11'].indexOf(item.meta.code) >= 0) {
          let reqUrl 
          if (['CT01', 'CT08', 'CT06', 'CT11'].indexOf(item.meta.code) >= 0 && this.keyword.length === 0) {
            reqUrl = `/api/v2/communities/${item.meta.code}/get_content?site_url=${item.link}`
          } else {
            reqUrl = `/api/v2/communities/${item.meta.code}/get_content?site_url=${url.origin}/${url.searchParams.get('document_srl')}`
          }
          return axios.get(reqUrl).then(resFunc).catch(errFunc)
        } else if (['CT07'].indexOf(item.meta.code) >= 0) {
          swal({
            width: '90vw',
            title: item.title,
            confirmButtonText: `<i class='fas fa-check-circle'></i> 확인`,
            html: '<hr><strong>뽐뿌는 미리보기를 지원하지 않습니다.</strong>',
            footer: `<a target=_blank href='${item.link}' class='uk-text-bold uk-text-danger'>해당 게시물 접속</a>`
          })
        } else if (['CT03', 'CT13'].indexOf(item.meta.code) >= 0) {
          return axios.get('/api/v2/communities/' + item.meta.code + '/get_content?site_url=' + url.origin + '/?' + url.searchParams.get('table') + '_' + url.searchParams.get('s_no')).then(resFunc).catch(errFunc)
        } else {
          return axios.get(`/api/v2/communities/${item.meta.code}/get_content?site_url=${item.link}`).then(resFunc).catch(errFunc)
        }
      }
    },
    saveInt (item, link) {
      Swal.queue([
        {
          title: '유형을 선택하세요',
          input: 'select',
          confirmButtonText: '선택',
          cancelButtonText: '취소',
          inputOptions: {
            'trend': '특이동향',
            'illegality': '법규위반의심'
          },
          inputPlaceholder: '유형 선택(동향 혹은 법규위반의심)',
          showCancelButton: true,
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value === 'trend' || value === 'illegality') {
                resolve()
              } else {
                resolve('옵션을 선택하세요.')
              }
            })
          }
        },
        {
          title: '상세 내용 입력',
          input: 'textarea',
          inputPlaceholder: '상세 내용을 입력해주세요.',
          showCancelButton: true,
          showLoaderOnConfirm: true,
          confirmButtonText: '저장',
          cancelButtonText: '취소',
          preConfirm: () => {},
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
        item.content = result.value[1]
        item.type = result.value[0]
        item.saved_at = new Date().toISOString()
        if (this.keyword.length === 0) {
          item.query = {
            "search_all": true,
            "search_keyword": undefined
          }
        } else {
          item.query = {
            "search_all": false,
            "search_keyword": this.keyword
          }
        }
        var url = ''
        try {
          url = new URL(link)
        } catch (e) {
          url = ''
          swal('에러!', e.toString(), 'error')
        }
        let refinedID = {
          CT01: `http://m.ilbe.com/${url.pathname.split('/')[2]}`,
          CT02: url.origin + url.pathname,
          CT03: url.origin + '/?' + url.searchParams.get('table') + '_' + url.searchParams.get('s_no'),
          CT04: link,
          CT05: `${url.origin}${url.pathname}?id=${url.searchParams.get('id')}`,
          CT06: this.keyword.length > 0? `${url.origin}/${url.searchParams.get('document_srl')}`: link,
          CT07: link,
          CT08: `http://m.ilbe.com/${url.pathname.split('/')[2]}`,
          CT09: `${url.origin}/${url.searchParams.get('document_srl')}`,
          CT10: link,
          CT11: this.keyword.length > 0? `${url.origin}/${url.searchParams.get('document_srl')}`: link,
          CT12: link,
          CT13: url.origin + '/?' + url.searchParams.get('table') + '_' + url.searchParams.get('s_no'),
        }[item.meta.code]
        swal({ title: '데이터 저장을 위한 작업 진행중입니다.', html: '인터넷 서비스 상태에 따라 처리시간이 소요될 수 있습니다.', allowOutsideClick: false, width: '90vw' })
        swal.showLoading()
        axios.get('/api/v2/service/screenshot?url=' + encodeURI(refinedID))
          .then(response => {
            swal.close()
             if (response.status === 200) {
              axios.post(`/api/v2/intelligences/`, { identifier: btoa(encodeURI(refinedID)), item: item, screenshot: response.data.result })
              .then(sRes => {
                if (sRes.status === 201) {
                  swal('저장 완료', '저장되었습니다.', 'success')
                } else {
                  throw Error('데이터 저장 과정에서 알 수 없는 오류가 발생하였습니다.')
                }
              })
              .catch(error => {
                if (error.response.status === 409) {
                  swal('저장 실패', error.response.data.status.message, 'warning')
                } else {
                  swal('저장 실패', error.response.data.statusText, 'error')
                }
              })
            } else {
              throw Error('페이지 스크린샷 과정에서 알 수 없는 오류가 발생하였습니다.')
            }
            if (response.dismiss === Swal.DismissReason.backdrop) { }
          }).catch(error => {
            swal(error, '저장 중 에러 발생', 'error')
          })
      })
    }
  }
}
</script>

<style lang="scss">

table {
  font-weight: 600;
  & a {
    color: #0054a6;
    &:hover {
      text-decoration: none;
    }
  }
}

.flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.flex-half {
    flex-direction: row;
    width: 50%;
}

.flex-left {
  align-items: center;
  align-content: center;
}

.flex-right {
  text-align: right;
  justify-content: flex-end;
  align-items: flex-end;
  > span {
    font-size: 5rem;
    font-weight: bold;
  }
}

</style>
