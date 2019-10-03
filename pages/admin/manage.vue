<template lang="html">
    <main>
        <div class="container-wrapper">
            <header data-role="app-title"><strong>사용자 관리</strong></header>
            <hr />
            <table class="uk-table">
                <thead>
                    <tr>
                        <th>계정</th>
                        <th>권한</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <button class="uk-button uk-button-danger uk-text-nowrap" @click=''>
                                <i class="fas fa-trash"></i>
                                <span class="btn-desc">삭제</span>
                            </button>
                            <button class="uk-button uk-button-danger uk-text-nowrap" @click=''>
                                <i class="fas fa-trash"></i>
                                <span class="btn-desc">비밀번호 초기화</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
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

<style scoped lang="scss">
    @import "~assets/css/components/main";
</style>