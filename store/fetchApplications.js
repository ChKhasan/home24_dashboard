export const actions = {
  async getOneClickOrders() {
    const res = await this.$axios.$get(`/one_click_orders`);
    return res;
  },
  async deleteOneClickOrders({}, id) {
    const res = await this.$axios.$delete(`/one_click_orders/${id}`);
    return res;
  },
};
