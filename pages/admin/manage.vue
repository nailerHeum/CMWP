<template lang="html">
    <div class="container-wrapper">
        <header data-role="app-title"><strong>사용자 관리</strong></header>
    </div>
</template>

<script>
export default {
    layout: 'service',
    middleware: 'auth',
    data () {
        return {}
    },
    head () {
        return { title: '계정관리 :: 커뮤니티게시물모니터링포털' }
    }
}
</script>

<style lang="scss">

</style>