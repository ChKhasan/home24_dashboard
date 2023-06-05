export const actions = {
  async getOneClickOrders() {
    const res = await this.$axios.$get(
      `https://test.loftcity.uz/api/admin/one_click_orders`
    );
    return res;
  },
  async deleteOneClickOrders({}, id) {
    const res = await this.$axios.$delete(
      `https://test.loftcity.uz/api/admin/one_click_orders/${id}`
    );
    return res;
  },
};
