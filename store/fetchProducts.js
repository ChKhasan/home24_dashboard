export const actions = {
  async getProducts({}, payload) {
    const res = await this.$axios.$get(
      `https://test.loftcity.uz/api/admin/products`,
      { params: payload }
    );
    return res;
  },
  async getProductsById({}, id) {
    const res = await this.$axios.$get(
      `https://test.loftcity.uz/api/admin/products/${id}`
    );
    return res;
  },
  async postProducts({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/products`,
      data
    );
    return res;
  },
  async editProducts({}, payload) {
    const res = await this.$axios.$put(
      `https://test.loftcity.uz/api/admin/products/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteProducts({}, id) {
    const res = await this.$axios.$delete(
      `https://test.loftcity.uz/api/admin/products/${id}`
    );
    return res;
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/products_groups`,
      data
    );
    return res;
  },
  
};
