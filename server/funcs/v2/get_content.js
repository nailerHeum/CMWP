const cheerio = require('cheerio')

module.exports = {
  CT01 (body) {
    const $ = cheerio.load(body)
    const content = $('.xe_content')
    return content.html()
  },
  CT02 (body) {
    const $ = cheerio.load(body)
    const content = $('.fr-view')
    return content.html()
  },
  CT03 (body) {
    const $ = cheerio.load(body)
    const content = $('.viewContent')
    return content.html()
  },
  CT04 (body) {
    const $ = cheerio.load(body)
    const content = $('.board_body .container')
    return content.html()
  },
  CT05 (body) {
    const $ = cheerio.load(body)
    const content = $('.view_context .ar_txt')
    return content.html()
  },
  CT06 (body) {
    const $ = cheerio.load(body)
    const content = $('.xe_content')
    return content.html()
  },
  CT08 (body) {
    const $ = cheerio.load(body)
    const content = $('.xe_content')
    return content.html()
  },
  CT09 (body) {
    const $ = cheerio.load(body)
    const content = $('.xe_content:first-child')
    return content.html()
  },
  CT10 (body) {
    const $ = cheerio.load(body)
    const content = $('.view_content')
    return content.html()
  },
  CT11 (body) {
    const $ = cheerio.load(body)
    const content = $('.xe_content')
    return content.html()
  },
  CT12 (body) {
    const $ = cheerio.load(body)
    const content = $('.post-content')
    return content.html()
  },
  CT13 (body) {
    const $ = cheerio.load(body)
    const content = $('.viewContent')
    return content.html()
  }
}
