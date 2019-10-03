const request = require('./request')

let crawlAPI = {
  getData: (type, keyword, all = false) => {
    let commTypeMatch = {
      'CT01': [`/api/v2/communities/CT01?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT01/all'],
      'CT02': [`/api/v2/communities/CT02?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT02/all'],
      'CT03': [`/api/v2/communities/CT03?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT03/all'],
      'CT04': [`/api/v2/communities/CT04?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT04/all'],
      'CT05': [`/api/v2/communities/CT05?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT05/all'],
      'CT06': [`/api/v2/communities/CT06?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT06/all'],
      'CT07': [`/api/v2/communities/CT07?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT07/all'],
      'CT08': [`/api/v2/communities/CT08?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT08/all'],
      'CT09': [`/api/v2/communities/CT09?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT09/all'],
      'CT10': [`/api/v2/communities/CT10?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT10/all'],
      'CT11': [`/api/v2/communities/CT11?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT11/all'],
      'CT12': [`/api/v2/communities/CT12?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT12/all'],
      'CT13': [`/api/v2/communities/CT13?keyword=${encodeURI(keyword)}`, '/api/v2/communities/CT13/all']
    }
    let crawl = async () => {
      const body = await request.call(commTypeMatch[type][all ? 1 : 0])
        .get()
      return body
    }
    return Promise.all([crawl()])
      .then((result) => {
        result = JSON.parse(result)
        if (result.data.status.code === 200) {
          return result.data
        } else {
          throw Error(result)
        }
      })
      .catch((error) => {
        return JSON.stringify(error)
      })
  }
}
let intAPI = {
  getData: async () => {
    const body = await request.call('/api/v2/intelligences')
      .get()
    return body
  }
}
let socialAPI = {
  searchTwitter: async (keyword) => {
    const body = await request.call(`/api/v2/social/twitter/${keyword}`)
      .get()
    return body
  }
}
let viewerAPI = {
  async checkIfDataExists (id) {
    const body = await request.call(`/api/v2/intelligences/${id}`)
      .get()
    return body
  },
  getData: async (id) => {
    const body = await request.call(`/api/v2/intelligences/${id}`)
      .get()
    return body
  }
}
let userAPI = {
  async getData () {
    let data = await request.call('/api/v2/users').get()
    return data
  }
}

export { crawlAPI, intAPI, socialAPI, viewerAPI, userAPI }
