<template>
   <aside class="gnb">
        <ul class="apps">
            <li :class="{ 'has-divider': app.divider, 'gnb-link': true }" v-for="app in normalApps" :key="app.index">
                <nuxt-link :to="app.link" :uk-tooltip="'title: ' + app.title + '; pos: right;'"><i :class="app.icon"></i></nuxt-link>
            </li>
            <li :class="{ 'has-divider': app.divider, 'gnb-link': true }" v-for="app in adminApp" :key="app.index">
              <nuxt-link :to="app.link" :uk-tooltip="'title: ' + app.title + '; pos: right;'"><i :class="app.icon"></i></nuxt-link>
            </li>
            <li :class="{ 'has-divider': app.divider, 'gnb-link': true }" v-for="app in logoutApp" :key="app.index">
              <a @click="logout" :uk-tooltip="'title: ' + app.title + '; pos: right;'"><i :class="app.icon"></i></a>
            </li>
        </ul>
    </aside>
</template>

<script>
import axios from 'axios'

export default {
  props: ['apps'],
  computed: {
    normalApps () {
      return this.apps.filter(app => !app.hasOwnProperty('admin') && !app.hasOwnProperty('logout'))
    },
    adminApp () {
      return this.apps.filter(app => app.hasOwnProperty('admin') && app.admin)
    },
    logoutApp () {
      return this.apps.filter(app => app.hasOwnProperty('logout'))
    }
  },
  methods: {
    logout () {
      axios.post('/api/v2/auth/logout')
        .then(response => {
          this.$store.commit('SET_USER', null)
          location.href = '/'
        })
    }
  }
}
</script>

<style lang="scss">
  @import "~assets/css/components/aside";
</style>
