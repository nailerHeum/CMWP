module.exports = {
  head: {
    title: '커뮤니티게시물모니터링포털',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Communities\' Posts Monitoring Portal' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//use.fontawesome.com/releases/v5.6.3/css/all.css', crossorigin: 'anonymous', integrity: 'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/' },
      { rel: 'stylesheet', type: 'text/css', href: '//cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css' },
      { rel: 'stylesheet', type: 'text/css', href: '//cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.26/css/uikit.min.css' }
    ],
    script: [
      { src: '//cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.26/js/uikit.min.js' },
      { src: '//cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.26/js/uikit-icons.min.js' },
      { src: '//cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.28.5/sweetalert2.all.js' },
      { src: '//cdn.polyfill.io/v2/polyfill.min.js' },
    ]
  },
  /*
  ** Global CSS
  */
  //  css: ['~/assets/css/main.css'],
  build: {
    vendor: ['axios' , 'babel-polyfill'],
    /*
    ** Run ESLINT on save
    */
    extend (config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: ['nuxt-session'],
  serverMiddleware: [
    // API middleware
    '~/server/index.js'
  ]
}
