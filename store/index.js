import axios from 'axios'

export const state = () => ({
  authUser: null
})

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.user) {
        commit('SET_USER', req.session.user)
    }
  },
  async login ({ commit }, { email, password }) {
      if (!email || !password) throw new Error('이메일 혹은 패스워드 입력은 필수입니다.')
      try {
          const { data } = await axios.post('/api/v2/auth/login', { email, password })
          commit('SET_USER', data)
      } catch (error) {
          throw new Error('이메일 혹은 패스워드에 오류가 있습니다.')
      }
  },
  async register ({ commit }, { email, password }) {
      if (!email || !password) throw new Error('이메일 혹은 패스워드 입력은 필수입니다.')
      try {
          const { data } = await axios.post('/api/v2/auth/register', { email, password })
          commit('SET_USER', data)
      } catch (error) {
          switch (error.response.status || 500) {
              case 409: throw new Error('해당 이메일은 이미 존재합니다.')
              case 500: throw new Error('서버 실행 중 오류가 발생하였습니다. (서비스 자체 오류)')
          }
      }
  },
  async logout ({ commit }) {
      const { data } = await axios.post('/api/v2/auth/logout')
      if (data.ok) commit('SET_USER', null)
  },
  async changePassword ({ commit }, { currentPassword, newPassword }) {
      if (!currentPassword || !newPassword) throw new Error('필수 항목이 입력되지 않았습니다.')
      try {
          await axios.patch('/api/v2/auth', { currentPassword, newPassword })
          commit('SET_USER', null)
      } catch (error) {
          throw new Error('패스워드가 잘못 입력되었습니다.')
      }
  }
}

export const mutations = {
  SET_USER: (state, user) => {
      state.authUser = user
  }
}