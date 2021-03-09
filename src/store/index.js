import { createStore } from 'vuex'

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
  },
  modules: {
  }
})
