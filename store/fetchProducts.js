export const actions = {
  async getProducts({},payload) {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/products`,{ params: payload }
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getProductsById({}, id) {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/products/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postProducts({}, data) {
    try {
      const res = await this.$axios.$post(
        `https://test.loftcity.uz/api/admin/products`,
        data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editProducts() {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/products`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteProducts({}, id) {
    try {
      const res = await this.$axios.$delete(
        `https://test.loftcity.uz/api/admin/products/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/products_groups`,
      data
    );
    return res;
  },
};
