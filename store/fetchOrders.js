export const actions = {
  async getOrders({}, payload) {
    const res = await this.$axios.$get(`/orders`, { params: payload });
    return res;
  },
  async getOrdersById({}, id) {
    const res = await this.$axios.$get(`/orders/${id}`);
    return res;
  },
  async postOrders({}, data) {
    const res = await this.$axios.$post(`/orders`, data);
    return res;
  },
  async editOrders({}, payload) {
    const res = await this.$axios.$put(`/orders/${payload.id}`, payload.data);
    return res;
  },
  async deleteOrders({}, id) {
    const res = await this.$axios.$delete(`/orders/${id}`);
    return res;
  },
};
