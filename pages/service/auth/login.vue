<template>
    <section id="auth" class="flex flex-half">
        <div class="flex flex-left flex-column justify-center">
            <img src="~assets/img/icon-inversed.png" alt="logo" width="100" />
            <h1>커뮤니티게시물모니터링시스템</h1>
            <h2>로그인</h2>
            <hr />
            <p>{{ userInfo }}</p>
            <div class="empty-space"></div>
        </div>
        <div class="flex flex-right flex-column justify-center">
            <form data-role="form" class="flex flex-column" @submit.prevent="auth">
                <input type="email" name="authID" placeholder="계정 아이디" v-model="form.email" required />
                <input type="password" name="authPW" placeholder="계정 비밀번호" v-model="form.password" required />
                <a data-role="btn_login_form" href="/service/auth/register">신규계정 권한요청</a>
                <p class="flash flash-error" v-if="form.error">{{ form.error }}</p>
                <input data-role="btn_login_form" type="submit" value="로그인" />
            </form>
        </div>
    </section>   
</template>

<script>
const defaultData = () => ({
    form: {
        error: null,
        email: '',
        password: ''
    },
    mode: {
        register: false,
        passwordRecovery: false
    }
})
export default {
    layout: 'login',
    middleware: 'authenticated',
    data: defaultData,
    computed: {
        userInfo () {
            if (this.$store.state.authUser) {
                return this.$store.state.authUser.email + '님, 환영합니다. (' + this.$store.state.authUser.mode + ')'
            } else {
                return '서비스 이용을 위해 로그인하여 주시기 바랍니다.'
            }
        }
    },
    methods: {
        reset () {
            const d = defaultData()
            Object.keys(d).forEach((key) => {
                this.$data[key] = d[key]
            })
        },
        auth () {
            try {
                this.$store.dispatch('login', {
                    email: this.form.email,
                    password: this.form.password
                }).then(result => {
                    if (this.$store.state.authUser) {
                        this.$router.push('/')
                    }
                })
                this.reset()
            } catch (e) {
                this.form.error = e.message
            }
        }
    }
}
</script>

<style lang="scss">
@import "~assets/css/layout/auth";
@import "~assets/css/media";
</style>