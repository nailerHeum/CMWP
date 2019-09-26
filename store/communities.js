import { crawlAPI } from '../lib/api'

export const state = () => ({
    communities: [],
    keyword: '',
    crawledData: [],
    response: [],
    results: {},
    counts: {},
    totalCount: 0
})

export const mutations = {
    addCount (state, data) {
        state.totalCount = state.totalCount + data
    },
    setKeyword (state, data) {
        state.keyword = data
    },
    addData (state, data) {
        state.crawledData = state.crawledData.concat(state.crawledData, data)
    },
    setResponse(state, data) {
        state.response.push(data)
    },
    setResult (state, data) {
        state.results[data.type] = data.result
    },
    setTypes (state, data) {
        state.communities = data
        for (let comm of data) {
            state.results[comm] = false
        }
    },
    setCount (state, data) {
        state.counts[data.type] = data.count
    },
    clearData (state) {
        state.keyword = ''
        state.response = []
        state.counts = {}
        state.results = {}
        state.crawledData = []
        state.totalCount = 0
    }
}

export const getters = {
    getCommTypes: state => (state.communities),
    getKeyword: state => (state.keyword),
    getCrawlData: state => (state.crawledData),
    getDataCount: state => (state.totalCount),
    getEachCount: state => (state.counts),
    getResponse: state => (state.response),
    getResults: state => (state.results)
}

export const actions = {
    clear (store) {
        store.commit('clearData')
    },
    setTypes (store, arr) {
        store.commit('setTypes', arr)
    },
    crawl (store, { keyword, all }) {
        store.commit('clearData')
        store.commit('setKeyword', keyword)
        for (let comm of this.getters['communities/getCommTypes']) {
            crawlAPI.getData(comm, this.getters['communities/getKeyword'], all).then(data => {
                store.commit('setResponse', { comm: comm, response: true })
                store.commit('addData', data.items)
                store.commit('setResult', { type: comm, result: data.status.code === 200 })
                store.commit('addCount', data.status.count)
                store.commit('setCount', { type: comm, count: data.status.count })
            })
        }
    }
}