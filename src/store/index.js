import { createStore } from 'vuex'

export default createStore({
  state: {
    weather_api: {
        url: "api.weatherapi.com/v1",
        key: "9b511c1c735e40ecb8f102527202010",
      },
    search_engine: {
      value: '',
    }
  },
  mutations: {
    SET_SEARCH_ENGINE(state, value) {
      state.search_engine.value = value;
    }
  },
  actions: {
    setSearchEngine({commit}, value) {
      commit('SET_SEARCH_ENGINE', value);
    }
  },
  modules: {
  }
})
