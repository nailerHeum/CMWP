<template>
    <header class="topDrawer">
        <nav class="lnb">
            <a class="service" :href="home_url" uk-tooltip="title: 첫페이지로 이동합니다.; pos: bottom-left;">
                <h1 class="logo">커뮤니티게시물모니터링포털</h1>
            </a>
            <span class="breadcrumb">{{ title }}</span>
            <a class="nav_right" href="/" uk-tooltip="title: 커뮤니티게시물모니터링포털 첫페이지로 이동합니다.; pos: bottom-left;"><i class="fas fa-home"></i></a>
        </nav>
    </header>
</template>

<script>
export default {
    props: ['title', 'home_btn', 'home_url']
}
</script>

<style lang="scss">
@import "~assets/css/components/topDrawer";
</style>
