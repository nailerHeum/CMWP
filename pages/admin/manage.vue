<template lang="html">
    <main>
        <div class="container-wrapper">
            <header data-role="app-title"><strong>사용자 관리</strong></header>
            <hr />
            <table class="uk-table uk-table-divider uk-table-hover uk-table-striped uk-table-small uk-table-middle uk-table-responsive">
                <thead>
                    <tr>
                        <th>계정</th>
                        <th>권한</th>
                        <th>생성일</th>
                        <th>승인여부</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="user.email" v-for="user in userList">
                        <td><strong>{{ user.email }}</strong></td>
                        <td>{{ user.mode }}</td>
                        <td>{{ user.created.split('T')[0] }}</td>
                        <td>
                            <p v-if="user.mode === '관리자' || user.usable">승인</p>
                            <button v-else class="uk-button uk-button-secondary uk-text-nowrap" @click='agreeUser(user.email)'>
                                <i class="fas fa-check-circle"></i>
                                <span class="btn-desc">사용승인</span>
                            </button>
                        </td>
                        <td>
                            <button v-if="user.mode !== '관리자'" class="uk-button uk-button-danger uk-text-nowrap" @click='removeUser(user.email)'>
                                <i class="fas fa-trash"></i>
                                <span class="btn-desc">삭제</span>
                            </button>
                            <button v-if="user.mode !== '관리자'" class="uk-button uk-button-primary uk-text-nowrap" @click='initializePW(user.email)'>
                                <i class="fas fa-redo"></i>
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
import axios from 'axios'
export default {
    layout: 'service',
    middleware: 'auth',
    head () {
        return { title: '계정관리 :: 커뮤니티게시물모니터링포털' }
    },
    created () {
        this.$store.dispatch('getUsers')
    },
    computed: {
        userList () {
            return this.$store.getters['getUserList']
        }
    },
    methods: {
        agreeUser (account) {
            swal({
                title: `${account} 계정을 승인할까요?`,
                text: '승인 후 해당 계정의 사이트 이용이 가능합니다.',
                type: 'warning',
                width: '90vw',
                showCancelButton: true,
                confirmButtonColor: '#0054A6',
                cancelButtonColor: '#ed1b2f',
                confirmButtonText: '<i class="far fa-check-circle"></i> 승인',
                cancelButtonText: '<i class="fas fa-ban"></i> 취소',
                allowOutsideClick: false,
                showLoaderOnConfirm: true,
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {}
                else {
                    axios.put(`/api/v2/user/${account}/usable`).then(response => {
                        if (response.data.status.code === 200) {
                            this.$store.dispatch('getUsers')
                            swal('승인 완료', '승인되었습니다.', 'success')
                        } else {
                            throw new Error(result)
                        }
                    })
                }
            }).catch(response => {
                swal('에러 발생', response, 'error')
            })
        },
        removeUser (account) {
            swal({
                title: `${account} 계정을 삭제할까요?`,
                text: '삭제 후 복원할 수 없습니다.',
                type: 'warning',
                width: '90vw',
                showCancelButton: true,
                confirmButtonColor: '#0054A6',
                cancelButtonColor: '#ed1b2f',
                confirmButtonText: '<i class="far fa-trash-alt"></i> 삭제',
                cancelButtonText: '<i class="fas fa-ban"></i> 취소',
                allowOutsideClick: false,
                showLoaderOnConfirm: true,
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {}
                else {
                    axios.delete(`/api/v2/user/${account}`).then(response => {
                        if (response.data.status.code === 200) {
                            this.$store.dispatch('getUsers')
                            swal('삭제 완료', '삭제되었습니다.', 'success')
                        } else {
                            throw new Error(result)
                        }
                    })
                }
            }).catch(response => {
                swal('에러 발생', response, 'error')
            })
        },
        initializePW (account) {
            swal({
                title: `${account} 계정 패스워드를 초기화할까요?`,
                text: '초기 비밀번호는 CMWPservice_' + account.split('@')[0] + '이며, 로그인 이후 해당 사용자가 패스워드를 변경할 수 있습니다.',
                type: 'warning',
                width: '90vw',
                showCancelButton: true,
                confirmButtonColor: '#0054A6',
                cancelButtonColor: '#ed1b2f',
                confirmButtonText: '<i class="far fa-trash-alt"></i> 초기화',
                cancelButtonText: '<i class="fas fa-ban"></i> 취소',
                allowOutsideClick: false,
                showLoaderOnConfirm: true,
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {}
                else {
                    axios.put(`/api/v2/user/${account}/password`).then(response => {
                        if (response.data.status.code === 200) {
                            this.$store.dispatch('getUsers')
                            swal('초기화 완료', '초기화되었습니다.', 'success')
                        } else {
                            throw new Error(result)
                        }
                    })
                }
            }).catch(response => {
                swal('에러 발생', response, 'error')
            })
        }
    }
}
</script>

<style scoped lang="scss">
    @import "~assets/css/components/main";
</style>