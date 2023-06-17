export const actions = {
  async getDiscount({}, payload) {
    const res = await this.$axios.$get(`/discounts`, { params: payload });
    return res;
  },
  async postDiscount({}, data) {
    const res = await this.$axios.$post(`/discounts`, data);
    return res;
  },

  async editDiscount({}, payload) {
    const res = await this.$axios.$put(
      `/discounts/${payload.id}`,
      payload.data
    );
    return res;
  },
  async showDiscount({}, id) {
    const res = await this.$axios.$get(`/discounts/${id}`);
    return res;
  },
  async deleteDiscount({}, id) {
    const res = await this.$axios.$delete(`/discounts/${id}`);
    return res;
  },
};
