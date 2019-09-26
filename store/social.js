import { socialAPI } from '../lib/api'

export const state = () => ({
    result: false,
    data: [],
    count: 0
})

export const actions = {
    clear (store) {
      store.commit('setResult', false)
      store.commit('setData', [])
    },
    searchTwitter (store, keyword) {
      socialAPI.searchTwitter(keyword).then(data => {
        data = JSON.parse(data)
        if (data.status.code === 200) {
          store.commit('setResult', true)
          store.commit('setData', data.items)
          store.commit('setCount', data.status.count)
        } else {
          throw Error(data.status.message)
        }
      }).catch(error => {
        if (error) store.commit('setResult', false)
      })
    }
  }

export const mutations = {
    setData (state, data) {
      state.data = data
    },
    setResult (state, data) {
      state.result = data
    },
    setCount (state, data) {
      state.count = data
    }
}  

export const getters = {
    getResult: state => (state.result),
    getCount: state => (state.count),
    getData: state => (state.data)
}