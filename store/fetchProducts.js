export const actions = {
  async getProducts({}, payload) {
    const res = await this.$axios.$get(`/products`, { params: payload });
    return res;
  },
  async getProductsById({}, id) {
    const res = await this.$axios.$get(`/products/${id}`);
    return res;
  },
  async postProducts({}, data) {
    const res = await this.$axios.$post(`/products`, data);
    return res;
  },
  async editProducts({}, payload) {
    const res = await this.$axios.$put(`/products/${payload.id}`, payload.data);
    return res;
  },
  async deleteProducts({}, id) {
    const res = await this.$axios.$delete(`/products/${id}`);
    return res;
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(`/products_groups`, data);
    return res;
  },
};
