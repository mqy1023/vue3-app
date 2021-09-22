import { createStore } from 'vuex'
// vuex数据管理框架
const setChanceInfo = (state) => {
  const { chanceInfo } = state
  localStorage.chanceInfo = chanceInfo
}

const getChanceInfo = () => {
  return localStorage.chanceInfo ? localStorage.chanceInfo : 0
}

export default createStore({
  state: {
    chanceInfo: getChanceInfo()
  },
  mutations: {
    changeChanceInfo (state, payload) {
      const { chanceInfo } = payload
      state.chanceInfo = chanceInfo
      setChanceInfo(state)
    }
  },
  actions: {
    changeInfo ({commit, state}, infos) {
      const preInfos = state.chanceInfo
      console.log('preInfos=', preInfos)
      commit('changeChanceInfo', { chanceInfo: infos })
    }
  },
  modules: {
  }
})
