export const state = () => ({
  showcases: [],
  changeShowcases: true,
  ordersCount: {
    all: 0,
    accepted: 0,
    canceled: 0,
    done: 0,
    new: 0,
    pending: 0,
    returned: 0,
  },
});

export const mutations = {
  showcases(state, payload) {
    state.showcases = payload.data;
    state.changeShowcases = payload.change;
  },
  ordersCount(state, payload) {
    state.ordersCount.all =
      payload.pending + payload.accepted + payload.canceled + payload.new;
    state.ordersCount.new = payload.new;
    state.ordersCount.pending = payload.pending;
    state.ordersCount.accepted = payload.accepted;
    state.ordersCount.canceled = payload.canceled;
    state.ordersCount.done = payload.done;
    state.ordersCount.returned = payload.returned;
  },
};

export const actions = {
  async getOrdersCount({ commit }, payload) {
    const res = await this.$axios.$get(
      `/orders/counts`
      // , {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      //   },
      // }
    );
    commit("ordersCount", res?.counts);
  },
  async getShowCasesStore({ commit }, payload) {
    const res = await this.$axios.$get(`/showcases/all`);
    commit("showcases", { data: res?.showcases, change: payload });
  },
};
