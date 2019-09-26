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
    this.$router.push('/service/intelligences/analytics')
  },
}
</script>

<style scoped lang="scss">
  @import "~assets/css/components/main";
</style>
