<template>
   <aside class="gnb">
        <ul class="apps">
            <li :class="{ 'has-divider': app.divider }" v-for="app in apps" :key="app.index" class="gnb-link">
                <nuxt-link v-if="!app.logout" :to="app.link" :uk-tooltip="'title: ' + app.title + '; pos: right;'"><i :class="app.icon"></i></nuxt-link>
                <nuxt-link v-else-if="app.admin" :to="app.link" :uk-tooltip="'title: ' + app.title + '; pos: right;'"><i :class="app.icon"></i></nuxt-link>
                <a v-else @click="logout" :uk-tooltip="'title: ' + app.title + '; pos: right;'"><i :class="app.icon"></i></a>
            </li>
        </ul>
    </aside>
</template>

<script>
import axios from 'axios'

export default {
  props: ['apps'],
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
