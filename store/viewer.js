import { viewerAPI } from '../lib/api'

export const state = () => ({
    exists: undefined,
    pdfResponse: false,
    id: undefined,
    data: undefined
})

export const actions = {
    getData (store, id) {
      viewerAPI.checkIfDataExists(id).then(result => {
        if (JSON.parse(result).status.code === 200) {
          store.commit('setExists', true)
        } else if (JSON.parse(result).status.code === 404) {
          store.commit('setExists', false)
        }
      }).then(result => {
        if (store.state.exists) {
          viewerAPI.getData(id).then(data => {
            store.commit('setResponse', true)
            store.commit('setID', id)
            store.commit('setData', data)
          })
        }
      })
    }
}

export const mutations = {
    setResponse (state, data) {
      state.pdfResponse = data
    },
    setID (state, data) {
      state.id = data
    },
    setData (state, data) {
      state.data = data
    },
    setExists (state, data) {
      state.exists = data
    }
}

export const getters = {
    getID: state => state.id,
    getData: state => state.data,
    getResponse: state => state.pdfResponse,
    getExists: state => state.exists
}