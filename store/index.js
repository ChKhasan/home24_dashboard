export const state = () => ({
  showcases: [],
  changeShowcases: true,
});

export const mutations = {
  showcases(state, payload) {
    state.showcases = payload.data;
    state.changeShowcases = payload.change;
  },
};

export const actions = {
  // async getShowCasesStore({ commit }, payload) {
  //   const res = await this.$axios.$get(`/showcases/all`);
  //   commit("showcases", { data: res?.showcases, change: payload });
  // },
};
