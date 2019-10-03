<template>
    <main>
       <div class="container-wrapper"></div>
    </main>
</template>

<script>
export default {
  layout: 'service',
  middleware: 'auth',
  beforeMount () {
    if (this.$store.state.authUser.usable) {
      this.$router.push('/service/intelligences/analytics')
    } else {
      this.$router.push('/waitForUsable')
    }
  },
}
</script>

<style scoped lang="scss">
  @import "~assets/css/components/main";
</style>
