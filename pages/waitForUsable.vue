<template>
    <section id="message_waitForUsable">
        <header>{{ user }}님은 아직 승인을 대기하고 있습니다.</header>
        <hr />
        <p>승인이 완료되는대로 서비스 이용이 가능합니다.</p>
    </section>
</template>

<script>
export default {
    layout: 'wait',
    middleware: 'auth',
    computed: {
        user () {
            return this.$store.state.authUser.email
        }
    }
}
</script>