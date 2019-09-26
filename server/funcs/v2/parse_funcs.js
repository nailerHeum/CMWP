const cheerio = require('cheerio')
const UTCSeoul = 9

/*
DATA META INT_TYPE CODE
- INTCOMM     : 커뮤니티 게시물
- INTSOCN       : SNS 게시물

COMMUNITIES TYPE CODE
- CT01       : 일간베스트(일베)
- CT02       : 클리앙
- CT03       : 오늘의유머(사회)
- CT04       : 와이고수
- CT05       : MLB파크
- CT06       : 에펨코리아
- CT07       : 뽐뿌
- CT08       : 일간베스트(짤방)
- CT09       : 더쿠
- CT10       : 루리웹
- CT11       : 개드립
- CT12       : 워마드
- CT13       : 오늘의유머(사회)
*/

const jsonStrings = {
  title: 'Communities Monitoring Works Portal API',
  msg_ok: 'ok',
  msg_error: '알 수 없는 에러가 발생하였습니다.',
  msg_error_nodata_provided: '해당 사이트가 데이터를 제공하지 않습니다.'
}

const getIntData = (iVar) => {
  if (iVar == '' || iVar == undefined || iVar == null) {
    return 0
  } else {
    return parseInt(iVar)
  }
}

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h)
  return this
}

module.exports = {
  CT01: {
    ALL: (body) => {
      const $ = cheerio.load(body)
      const list = $(".board-list > .board-body > li:not([class])")
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['post_id'] = getIntData($(this).find('.count').text().replace(',', ''))
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT01',
            site: '일간베스트',
            site_thumb_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ilbe_logo.svg/150px-Ilbe_logo.svg.png'
          }
          item['category'] = '일베'
          item['title'] = $(this).find('.title > a').text()
          item['author'] = $(this).find(".nick > a").text()
          let date = $(this).find('.date').text()
          if (date.includes(':')) {
            item['date'] = new Date(`${new Date().toISOString().split('T')[0]} ${date}`).addHours(UTCSeoul)
          } else {
            item['date'] = new Date(date).addHours(UTCSeoul)
          }
          item['recommends'] = getIntData($(this).find('.recomm').text())
          item["views"] = getIntData($(this).find('.view').text().replace(',', ''))
          item['link'] = `http://ilbe.com${$(this).find('.title > a').attr('href')}`
          if (!(isNaN(item['post_id']) || item['link'] === undefined)) {
            items.push(item)
          }
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL: (body) => {
      const $ = cheerio.load(body)
      const list = $(".board-list > .board-body > li:not([class])")
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['post_id'] = getIntData($(this).find('.count').text().replace(',', ''))
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT01',
            site: '일간베스트',
            site_thumb_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ilbe_logo.svg/150px-Ilbe_logo.svg.png'
          }
          item['category'] = '일베'
          item['title'] = $(this).find('.title > a').text()
          item['author'] = $(this).find(".nick > a").text()
          let date = $(this).find('.date').text()
          if (date.includes(':')) {
            item['date'] = new Date(`${new Date().toISOString().split('T')[0]} ${date}`).addHours(UTCSeoul)
          } else {
            item['date'] = new Date(date).addHours(UTCSeoul)
          }
          item['recommends'] = getIntData($(this).find('.recomm').text())
          item["views"] = getIntData($(this).find('.view').text().replace(',', ''))
          item['link'] = `http://ilbe.com${$(this).find('.title > a').attr('href')}`
          if (!(isNaN(item['post_id']) || item['link'] === undefined)) {
            items.push(item)
          }
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    }
  },
  CT08: {
    ALL: (body) => {
      const $ = cheerio.load(body)
      const list = $(".board-list > .board-body > li:not([class])")
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT08',
            site: '일간베스트',
            site_thumb_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ilbe_logo.svg/150px-Ilbe_logo.svg.png'
          }
          item['post_id'] = getIntData($(this).find('.count').text().replace(',', ''))
          item['category'] = '짤방'
          item['title'] = $(this).find('.title > a').text()
          item['author'] = $(this).find(".nick > a").text()
          let date = $(this).find('.date').text()
          if (date.includes(':')) {
            item['date'] = new Date(`${new Date().toISOString().split('T')[0]} ${date}`).addHours(UTCSeoul)
          } else {
            item['date'] = new Date(date).addHours(UTCSeoul)
          }
          item['recommends'] = getIntData($(this).find('.recomm').text())
          item["views"] = getIntData($(this).find('.view').text().replace(',', ''))
          item['link'] = `http://ilbe.com${$(this).find('.title > a').attr('href')}`
          if (!(isNaN(item['post_id']) || item['link'] === undefined)) {
            items.push(item)
          }
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL: (body) => {
      const $ = cheerio.load(body)
      const list = $(".board-list > .board-body > li:not([class])")
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT08',
            site: '일간베스트',
            site_thumb_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ilbe_logo.svg/150px-Ilbe_logo.svg.png'
          }
          item['post_id'] = getIntData($(this).find('.count').text().replace(',', ''))
          item['category'] = '짤방'
          item['title'] = $(this).find('.title > a').text()
          item['author'] = $(this).find(".nick > a").text()
          let date = $(this).find('.date').text()
          if (date.includes(':')) {
            item['date'] = new Date(`${new Date().toISOString().split('T')[0]} ${date}`).addHours(UTCSeoul)
          } else {
            item['date'] = new Date(date).addHours(UTCSeoul)
          }
          item['recommends'] = getIntData($(this).find('.recomm').text())
          item["views"] = getIntData($(this).find('.view').text().replace(',', ''))
          item['link'] = `http://ilbe.com${$(this).find('.title > a').attr('href')}`
          if (!(isNaN(item['post_id']) || item['link'] === undefined)) {
            items.push(item)
          }
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    }
  },
  CT02: {
    ALL: (body) => {
      const $ = cheerio.load(body)
      const list = $('.list_item.symph_row')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT02',
            site: '클리앙',
            site_thumb_url: 'https://img.telegram.me/u/ae13ba5e4fa/5a43830dc29877caf3f62b.jpg'
          }
          item['category'] = $(this).find('.list_subject > .shortname').text()
          item['title'] = $(this).find('.list_subject > .subject_fixed').text()
          item['date'] = new Date($(this).find('.list_time .timestamp').text()).addHours(UTCSeoul)
          item['link'] = `https://www.clien.net${$(this).find('.list_subject').attr('href')}`
          item["views"] = parseInt($(this).find('.list_hit > .hit').text())
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL: (body) => {
      const $ = cheerio.load(body)
      const list = $('.list_item')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT02',
            site: '클리앙',
            site_thumb_url: 'https://img.telegram.me/u/ae13ba5e4fa/5a43830dc29877caf3f62b.jpg'
          }
          item['category'] = $(this).find('.list_subject button').text()
          item['title'] = $(this).find('.list_subject a').text()
          item['date'] = new Date($(this).find('.time > span.timestamp').text()).addHours(UTCSeoul)
          item['link'] = `http://www.clien.net${$(this).find('.list_subject a').attr('href')}`
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    }
  },
  CT03: {
    ALL (body) {
      const $ = cheerio.load(body)
      const list = $('.table_list > tbody > tr.view')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT03',
            site: '오늘의유머',
            site_thumb_url: 'http://m.todayhumor.co.kr/images/toplogo/toplogo_m.gif'
          }
          item['category'] = '사회'
          item['post_id'] = parseInt($(this).find('.no > a').text())
          item['title'] = $(this).find('.subject > a').text()
          item['link'] = `http://www.todayhumor.co.kr${$(this).find('.subject > a').attr('href')}`
          item['author'] = $(this).find('.name > a').text()
          item['views'] = parseInt($(this).find('.hits').text())
          item['recommends'] = parseInt($(this).find('.oknok').text())
          item['date'] = new Date(`20${$(this).find('.date').text()}`.replace(/\//gi, '-')).addHours(UTCSeoul)
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL (body) {
      const $ = cheerio.load(body)
      const list = $('.table_list > tbody > tr.view')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT03',
            site: '오늘의유머',
            site_thumb_url: 'http://m.todayhumor.co.kr/images/toplogo/toplogo_m.gif'
          }
          item['category'] = '사회'
          item['post_id'] = parseInt($(this).find('.no > a').text())
          item['title'] = $(this).find('.subject > a').text()
          item['link'] = `http://www.todayhumor.co.kr${$(this).find('.subject > a').attr('href')}`
          item['author'] = $(this).find('.name > a').text()
          item['views'] = parseInt($(this).find('.hits').text())
          item['recommends'] = parseInt($(this).find('.oknok').text())
          item['date'] = new Date(`20${$(this).find('.date').text().replace('/', '-')}`).addHours(UTCSeoul)
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    }
  },
  CT04: {
    ALL: (body) => {
      const $ = cheerio.load(body)
      const list = $('.bd_list tbody tr:not(.notice)')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          if ($(this).find('td').attr('colspan') !== "99") {
            var item = {}
            let today = new Date()
            let tmpDate = $(this).find('td.date').text().split(':')
            item['meta'] = {
              int_type: 'INTCOMM',
              code: 'CT04',
              site: '와이고수',
              site_thumb_url: 'https://www.ygosu.com/images/logo_2014.gif'
            }
            item['category'] = '정치/토론'
            item['post_id'] = parseInt($(this).find('td.no').text())
            item['title'] = $(this).find('td.tit a').text()
            if ($(this).find('td.tit a').attr('href').includes('javascript')) {
              item['link'] = ''
            } else {
              item['link'] = 'https://www.ygosu.com' + $(this).find('td.tit a').attr('href')
            }
            item['author'] = $(this).find('td.name a').text()
            if ($(this).find('td.date').text().includes('.')) {
              item['date'] = new Date($(this).find('td.date').text().replace('.', '-')).toISOString()
            } else {
              item['date'] = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(tmpDate[0]) + UTCSeoul, tmpDate[1], tmpDate[2])
            }
            item['views'] = parseInt($(this).find('td.read').text())
            items.push(item)
          }
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL: (body) => {
      const $ = cheerio.load(body)
      const list = $('.bd_list tbody tr:not(.notice)')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          if ($(this).find('td').attr('colspan') !== "99") {
            var item = {}
            let today = new Date()
            let tmpDate = $(this).find('td.date').text().split(':')
            item['meta'] = {
              int_type: 'INTCOMM',
              code: 'CT04',
              site: '와이고수',
              site_thumb_url: 'https://www.ygosu.com/images/logo_2014.gif'
            }
            item['category'] = '정치/토론'
            item['post_id'] = parseInt((new URL('http://www.ygosu.com' + $(this).find('td.tit a').attr('href'))).pathname.split('/')[3])
            item['title'] = $(this).find('td.tit a').text()
            if ($(this).find('td.tit a').attr('href').includes('javascript')) {
              item['link'] = ''
            } else {
              item['link'] = 'https://www.ygosu.com' + $(this).find('td.tit a').attr('href')
            }
            item['author'] = $(this).find('td.name a').text()
            if ($(this).find('td.date').text().includes('.')) {
              item['date'] = new Date($(this).find('td.date').text().replace('.', '-')).addHours(UTCSeoul)
            } else {
              item['date'] = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(tmpDate[0]) + UTCSeoul, tmpDate[1], tmpDate[2])
            }
            item['views'] = parseInt($(this).find('td.read').text())
            if (!isNaN(item['views'])) {
              items.push(item)
            }
          }
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    }
  },
  CT05: {
    ALL: (body) => {
      const $ = cheerio.load(body)
      var list = $('.tbl_type01 > tbody > tr')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          if ($(this).find('.bullpen').children().remove().end().text() !== '') {
            var item = {}
            let today = new Date()
            item['meta'] = {
              int_type: 'INTCOMM',
              code: 'CT05',
              site: 'MLB파크',
              site_thumb_url: 'http://image.donga.com/challenge/mlbpark/images/img_logo.gif'
            }
            item['category'] = $(this).find('span.word_bullpen').text()
            item['title'] = $(this).find('.bullpen').children().remove().end().text().trim()
            item['link'] = $(this).find('a.bullpenbox').attr('href')
            item['author'] = $(this).find('span.nick').text()
            if ($(this).find('span.date').text().includes(':')) {
              let tmpDate = $(this).find('span.date').text().split(':')
              item['date'] = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(tmpDate[0]) + UTCSeoul, tmpDate[1], tmpDate[2])
            } else {
              item['date'] = new Date($(this).find('span.date').text())
            }
            item['views'] = getIntData($(this).find('span.viewV').text())
            items.push(item)
          }
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL: (body) => {
      const $ = cheerio.load(body)
      var list = $('.tbl_type01 > tbody > tr')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          var item = {}
          let today = new Date()
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT05',
            site: 'MLB파크',
            site_thumb_url: 'http://image.donga.com/challenge/mlbpark/images/img_logo.gif'
          }
          item['category'] = $(this).find('span.word_bullpen').text()
          item['title'] = $(this).find('span.bullpen').children().remove().end().text().trim()
          item['link'] = $(this).find('a.bullpenbox').attr('href')
          item['author'] = $(this).find('span.nick').text()
          if ($(this).find('span.date').text().includes(':')) {
            let tmpDate = $(this).find('span.date').text().split(':')
            item['date'] = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(tmpDate[0]) + UTCSeoul, tmpDate[1], tmpDate[2])
          } else {
            item['date'] = new Date($(this).find('span.date').text())
          }
          item['views'] = getIntData($(this).find('span.viewV').text())
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    }
  },
  CT06: {
    ALL: (body) => {
      const $ = cheerio.load(body)
      var list = $('tbody > tr:not(.notice)')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          let today = new Date()
          let tmpDate = $(this).find('td.time').text().trim().split(':')
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT06',
            site: '에펨코리아',
            site_thumb_url: 'https://image.fmkorea.com/logos/fmkorealogo2.png'
          }
          item['category'] = '짤방/시사'
          item['author'] = $(this).find('td.author span a').text().trim()
          item['title'] = $(this).find('td.title a:first-child').text().trim()
          item['link'] = 'https://www.fmkorea.com' + $(this).find('td.title a:first-child').attr('href')
          try {
            let url = new URL('https://www.fmkorea.com' + $(this).find('td.title a:first-child').attr('href'))
            item['post_id'] = getIntData($(this).find('td.title a:first-child').attr('href').split('/')[1])
          } catch (e) {}
          if ($(this).find('td.time').text().trim().includes('.')) {
            item['date'] = new Date($(this).find('td.time').text().trim().replace('.', '-')).toISOString()
          } else {
            item['date'] = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(tmpDate[0]) + UTCSeoul, tmpDate[1], 0)
          }
          item['recommends'] = getIntData($(this).find('.m_no_voted').text().trim())
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL: (body) => {
      const $ = cheerio.load(body)
      var list = $('tbody > tr:not(.notice)')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          let today = new Date()
          let tmpDate = $(this).find('td.time').text().trim().split(':')
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT06',
            site: '에펨코리아',
            site_thumb_url: 'https://image.fmkorea.com/logos/fmkorealogo2.png'
          }
          item['category'] = '정치/시사'
          item['author'] = $(this).find('td.author span a').text()
          item['title'] = $(this).find('td.title a:first-child').text().trim()
          item['link'] = 'https://www.fmkorea.com' + $(this).find('td.title a:first-child').attr('href')
          try {
            let url = new URL('https://www.fmkorea.com' + $(this).find('td.title a:first-child').attr('href'))
            item['post_id'] = parseInt(url.searchParams.get('document_srl'))
          } catch (e) {}
          if ($(this).find('td.time').text().trim().includes('.')) {
            item['date'] = new Date($(this).find('td.time').text().trim().replace('.', '-')).toISOString()
          } else {
            item['date'] = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(tmpDate[0]) + UTCSeoul, tmpDate[1], 0)
          }
          item['recommends'] = getIntData($(this).find('.m_no_voted').text().trim())
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    }
  },
  CT07: {
    ALL: (body) => {
      const $ = cheerio.load(body)
      var list = $('table.title_bg tbody tr[class^=list]:not(.list_notice)')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT07',
            site: '뽐뿌',
            site_thumb_url: 'http://img.ppomppu.co.kr/images/main/201111/logo_small.gif'
          }
          item['category'] = '이슈/정치/토론'
          item['author'] = $(this).find('td:nth-child(2) span.list_name').text().trim()
          item['post_id'] = getIntData($(this).find('td:first-child').text())
          item['title'] = $(this).find('font.list_title').text()
          item['link'] = `http://www.ppomppu.co.kr/zboard/${$(this).find('td:nth-child(3) a').attr('href')}`
          item['date'] = new Date(`20${$(this).find('td:nth-child(4)').attr('title').replace(/\./gi, '-')}`).addHours(UTCSeoul)
          item['recommends'] = getIntData($(this).find('td:nth-child(5)').text().replace(' ', '').split('-')[0])
          item['views'] = getIntData($(this).find('td:last-child').text())
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL: (body) => {
      const $ = cheerio.load(body)
      var list = $('table.title_bg tbody tr[class^=list]:not(.list_notice)')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT07',
            site: '뽐뿌',
            site_thumb_url: 'http://img.ppomppu.co.kr/images/main/201111/logo_small.gif'
          }
          item['category'] = '이슈/정치/토론'
          item['author'] = $(this).find('td:nth-child(2) span.list_name').text().trim()
          item['post_id'] = getIntData($(this).find('td:first-child').text())
          item['title'] = $(this).find('font.list_title').text()
          item['link'] = `http://www.ppomppu.co.kr/zboard/${$(this).find('td:nth-child(3) a').attr('href')}`
          item['date'] = new Date(`20${$(this).find('td:nth-child(4)').attr('title').replace(/\./gi, '-')}`).addHours(UTCSeoul)
          item['recommends'] = getIntData($(this).find('td:nth-child(5)').text().replace(' ', '').split('-')[0])
          item['views'] = getIntData($(this).find('td:last-child').text())
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    }
  },
  CT09: {
    ALL (body) {
      const $ = cheerio.load(body)
      var list = $('table.theqoo_board_table > tbody > tr:not(.notice):not(.notice_expand)')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT09',
            site: '더쿠',
            site_thumb_url: 'https://cdn.theqoo.net/files/attach/images/24780/9b8a63ca56d4d27718caef1f6a34702d.png'
          }
          item['category'] = `정치토크|${$(this).find('td.cate > span').text()}`
          item['title'] = $(this).find('td.title > a:first-child > span').text()
          item['link'] = `http://theqoo.net${$(this).find('td.title > a:first-child').attr('href')}`
          if ($(this).find('td.time').text().trim().includes('.')) {
            if ($(this).find('td.time').text().trim().split('.').length == 3) {
              item['date'] = new Date(`20${$(this).find('td.time').text().trim()}`).addHours(UTCSeoul)
            } else if ($(this).find('td.time').text().trim().split('.').length == 2) {
              item['date'] = new Date(`${new Date().getFullYear()}.${$(this).find('td.time').text().trim()}`).addHours(UTCSeoul)
            }
          } else {
            item['date'] = new Date().addHours(UTCSeoul)
          }
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL (body) {
      // 비회원 데이터 미제공
      return {
        title: jsonStrings.title,
        status: {
          code: 404,
          message: jsonStrings.msg_error_nodata_provided,
          count: 0
        },
        items: []
      }
    }
  },
  CT10: {
    ALL: (body) => {
      const $ = cheerio.load(body)
      var list = $('tbody > tr:not(.notice)')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          let today = new Date()
          let tmpDate = $(this).find('td.time').text().trim().split(':')
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT10',
            site: '루리웹',
            site_thumb_url: 'https://img.ruliweb.com/img/2016/ruli_400x210.png'
          }
          item['category'] = `정치/${$(this).find('.divsn a').text()}`
          item['author'] = $(this).find('td.writer a').text()
          item['title'] = $(this).find('a.deco').text().trim()
          item['link'] = $(this).find('a.deco').attr('href')
          item['post_id'] = getIntData($(this).find('.id').text().trim())
          if ($(this).find('td.time').text().trim().includes('.')) {
            item['date'] = new Date($(this).find('td.time').text().trim().replace('.', '-')).addHours(UTCSeoul)
          } else {
            item['date'] = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(tmpDate[0]) + UTCSeoul, tmpDate[1], 0)
          }
          item['views'] = getIntData($(this).find('.hit > span').text().trim())
          item['recommends'] = getIntData($(this).find('.recomd > span').text().trim())
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL: (body) => {
      const $ = cheerio.load(body)
      var list = $('tbody > tr:not(.notice)')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          let today = new Date()
          let tmpDate = $(this).find('td.time').text().trim().split(':')
          item['meta'] = item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT10',
            site: '루리웹',
            site_thumb_url: 'https://img.ruliweb.com/img/2016/ruli_400x210.png'
          }
          item['category'] = `정치/${$(this).find('.divsn a').text()}`
          item['author'] = $(this).find('td.writer a').text()
          item['title'] = $(this).find('a.deco').text().trim()
          item['link'] = $(this).find('a.deco').attr('href')
          item['post_id'] = getIntData($(this).find('.id').text().trim())
          if ($(this).find('td.time').text().trim().includes('.')) {
            item['date'] = new Date($(this).find('td.time').text().trim().replace('.', '-')).addHours(UTCSeoul)
          } else {
            item['date'] = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(tmpDate[0]) + UTCSeoul, tmpDate[1], 0)
          }
          item['views'] = getIntData($(this).find('.hit > span').text().trim())
          item['recommends'] = getIntData($(this).find('.recomd > span').text().trim())
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    }
  },
  CT11: {
    ALL (body) {
      const $ = cheerio.load(body)
      const list = $('table.ed tbody tr:not(.notice)')
      const UTCSeoul = 9
      let items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          let date = new Date()
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT11',
            site: '개드립',
            site_thumb_url: 'https://www.dogdrip.net/files/attach/images/174688197/8ec7b0c15a0f2468744a22bae1d73a47.gif'
          }
          item['category'] = '정치사회판'
          item['title'] = $(this).find('td.title > a > span.ed.title-link').text()
          item['link'] = `${$(this).find('td.title > a').attr('href')}`
          item['author'] = $(this).find('td.author > a').children().remove().end().text().trim()
          if ($(this).find('td.time').text().includes('전')) {
            if ($(this).find('td.time').text().includes('일')) {
              item['date'] = date.setDate(date.getDate() - parseInt($(this).find('td.time').text().split(' ')[0]))
            } else {
              item['date'] = new Date().addHours(UTCSeoul)
            }
          } else {
            item['date'] = new Date($(this).find('td.time').text()).addHours(UTCSeoul)
          }
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL (body) {
      const $ = cheerio.load(body)
      const list = $('table.ed tbody tr:not(.notice)')
      let items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          let date = new Date()
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT11',
            site: '개드립',
            site_thumb_url: 'https://www.dogdrip.net/files/attach/images/174688197/8ec7b0c15a0f2468744a22bae1d73a47.gif'
          }
          item['category'] = '정치사회판'
          item['title'] = $(this).find('td.title > a > span.ed.title-link').text()
          item['link'] = `https://www.dogdrip.net${$(this).find('td.title > a').attr('href')}`
          item['author'] = $(this).find('td.author > a').children().remove().end().text().trim()
          if ($(this).find('td.time').text().includes('전')) {
            if ($(this).find('td.time').text().includes('일')) {
              item['date'] = date.setDate(date.getDate() - parseInt($(this).find('td.time').text().split(' ')[0]))
            } else {
              item['date'] = new Date().addHours(UTCSeoul)
            }
          } else {
            item['date'] = new Date($(this).find('td.time').text()).addHours(UTCSeoul)
          }
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    }
  },
  CT12: {
    ALL (body) {
      const $ = cheerio.load(body)
      const list = $('.basic > tbody > tr')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT12',
            site: '워마드',
            site_thumb_url: 'https://womad.life/assets/wm_logo_1-143848808c6f595a02265a86eb293aed2ab0ca44b50a95d940f6fc1ddcd8ccae.png'
          }
          item['post_id'] = getIntData($(this).find('td.number').text())
          if ($(this).find('td.title a span.category-text').text().length == 0) {
            item['category'] = $(this).find('td:nth-child(2)').text()
            item['title'] = $(this).find('td.title a').text().split('\n')[1].trim()
          } else {
            item['category'] = $(this).find('td.title a span.category-text').text()
            item['title'] = $(this).find('td.title a').children().remove().end().text().trim()
          }
          item['link'] = `https://womad.life${$(this).find('td:nth-child(3) a').attr('href')}`
          item['author'] = $(this).find('td:nth-child(4)').text()
          let today = new Date()
          let date = $(this).find('td:nth-child(5)').text()
          if (date.includes(':')) {
            let hour = date.split(':')[0]
            let minute = date.split(':')[1]
            item['date'] = new Date(`${today.getMonth() + 1} ${today.getDate()} ${today.getFullYear()} ${parseInt(hour)}:${minute}:00`).addHours(UTCSeoul)
          } else if (date.includes('.')) {
            item['date'] = new Date(`${date.split('.')[1]} ${date.split('.')[2]} 20${date.split('.')[0]} 00:00:00`).addHours(UTCSeoul)
          }
          item['views'] = getIntData($(this).find('td:nth-child(6)').text().replace(',', ''))
          item['recommends'] = getIntData($(this).find('td:nth-child(7)').text().replace(',', ''))
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL (body) {
      return {
        title: jsonStrings.title,
        status: {
          code: 404,
          message: jsonStrings.msg_error_nodata_provided,
          count: 0
        },
        items: []
      }
    }
  },
  CT13: {
    ALL (body) {
      const $ = cheerio.load(body)
      const list = $('.table_list > tbody > tr.view')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT13',
            site: '오늘의유머',
            site_thumb_url: 'http://m.todayhumor.co.kr/images/toplogo/toplogo_m.gif'
          }
          item['category'] = '시사'
          item['post_id'] = $(this).find('.no > a').text()
          item['title'] = $(this).find('.subject > a').text()
          item['link'] = `http://www.todayhumor.co.kr${$(this).find('.subject > a').attr('href')}`
          item['author'] = $(this).find('.name > a').text()
          item['views'] = getIntData($(this).find('.hits').text())
          item['recommends'] = getIntData($(this).find('.oknok').text())
          item['date'] = new Date(`20${$(this).find('.date').text()}`.replace(/\//gi, '-')).addHours(UTCSeoul)
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    },
    PARTIAL (body) {
      const $ = cheerio.load(body)
      const list = $('.table_list > tbody > tr.view')
      var items = []
      if (list !== undefined) {
        list.each(function () {
          let item = {}
          item['meta'] = {
            int_type: 'INTCOMM',
            code: 'CT13',
            site: '오늘의유머',
            site_thumb_url: 'http://m.todayhumor.co.kr/images/toplogo/toplogo_m.gif'
          }
          item['category'] = '시사'
          item['post_id'] = $(this).find('.no > a').text()
          item['title'] = $(this).find('.subject > a').text()
          item['link'] = `http://www.todayhumor.co.kr${$(this).find('.subject > a').attr('href')}`
          item['author'] = $(this).find('.name > a').text()
          item['views'] = getIntData($(this).find('.hits').text())
          item['recommends'] = getIntData($(this).find('.oknok').text())
          item['date'] = new Date(`20${$(this).find('.date').text().replace('/', '-')}`).addHours(UTCSeoul)
          items.push(item)
        })
        return {
          title: jsonStrings.title,
          status: {
            code: 200,
            message: jsonStrings.msg_ok,
            count: items.length
          },
          items: items
        }
      } else {
        return {
          title: jsonStrings.title,
          status: {
            code: 500,
            message: jsonStrings.msg_error,
            count: 0
          },
          items: []
        }
      }
    }
  }
}