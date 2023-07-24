export const actions = {
  async getTopBars({}, payload) {
    const res = await this.$axios.$get(`/bars`, { params: payload });
    return res;
  },
  async getTopBarsById({}, id) {
    const res = await this.$axios.$get(`/bars/${id}`);
    return res;
  },
  async postTopBars({}, data) {
    const res = await this.$axios.$post(`/bars`, data);
    return res;
  },
  async editTopBars({}, payload) {
    const res = await this.$axios.$put(`/bars/${payload.id}`, payload.data);
    return res;
  },
  async deleteTopBars({}, id) {
    const res = await this.$axios.$delete(`/bars/${id}`);
    return res;
  },
};
