<template>
    <section id="auth" class="flex flex-half">
        <div class="flex flex-left flex-column justify-center">
            <img src="~assets/img/icon-inversed.png" alt="logo" width="100" />
            <h1>커뮤니티게시물모니터링시스템</h1>
            <h2>계정생성</h2>
            <hr />
            <p>요청시, 관리자 승인이 이루어진 후 서비스 이용이 가능합니다.</p>
            <div class="empty-space"></div>
        </div>
        <div class="flex flex-right flex-column justify-center">
            <form data-role="form" class="flex flex-column" @submit.prevent="auth">
                <input type="email" name="authID" placeholder="계정 아이디" v-model="form.email" />
                <input type="password" name="authPW" placeholder="계정 비밀번호" v-model="form.password" />
                <input type="password" name="authPWconfirm" placeholder="계정 비밀번호 재확인" v-model="form.passwordConfirm" />
                <p class="flash flash-error" v-if="form.error">{{ form.error }}</p>
                <input data-role="btn_login_form" type="submit" value="회원가입" />
                <a data-role="btn_login_form" @click="goBack">돌아가기</a>
            </form>
        </div>
    </section>   
</template>

<script>
const defaultData = () => ({
    form: {
        error: null,
        email: '',
        password: '',
        passwordConfirm: ''
    },
    mode: {
        register: true,
        passwordRecovery: false
    }
})

export default {
    layout: 'login',
    data: defaultData,
    methods: {
        goBack() {
            this.$router.back()
        },
        reset () {
            const d = defaultData()
            Object.keys(d).forEach((key) => {
                this.$data[key] = d[key]
            })
        },
        async auth () {
            try {
                if (this.mode.register && this.form.password !== this.form.passwordConfirm) {
                    throw Error('패스워드와 패스워드 재확인이 일치하지 않습니다.')
                }
                const action = this.mode.register ? 'register' : 'login'
                await this.$store.dispatch(action, {
                    email: this.form.email,
                    password: this.form.password
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