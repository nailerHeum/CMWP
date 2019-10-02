import { intAPI } from '../lib/api'

export const state = () => ({
    cntTypes: {
      social: 0,
      comm: 0
    },
    count: 0,
    error: false,
    result: false,
    data: []
})

export const mutations = {
    setCntTypes (state, data) {
      state.cntTypes = data
    },
    setData (state, data) {
      state.data = data
    },
    setResult (state, data) {
      state.result = data
    },
    setError (state, data) {
      state.error = data
    },
    setCount (state, data) {
      state.count = data
    },
    removeItem (state, data) {
      state.data = state.data.filter(item => item._id !== data)
      state.count = state.count - 1
    }
}

export const actions = {
    getData (store) {
      intAPI.getData().then(data => {
        data = JSON.parse(data)
        if (data.status.code === 404) {
          throw Error(data.status.message)
        } else {
          store.commit('setCount', data.result.length)
          store.commit('setData', data.result)
          store.commit('setResult', true)
          store.commit('setCntTypes', { social: data.result.filter(item => item.item.meta.int_type == 'INTSOCIAL').length, comm: data.result.filter(item => item.item.meta.int_type == 'INTCOMM').length})
        }
      }).catch(data => {
        console.error(data)
        store.commit('setResult', false)
        store.commit('setError', true)
      })
    },
    removeItem (store, id) {
      store.commit('removeItem', id)
    }
}

export const getters = {
    getData: state => (state.data),
    chkError: state => (state.error),
    getCount: state => ([state.data.filter(each => each.item.type == "trend").length, state.data.filter(each => each.item.type == "illegality").length]),
    getCntTypes: state => (state.cntTypes)
}