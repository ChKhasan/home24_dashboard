export const actions = {
  async getProducts() {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/products`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postProducts({}, data) {
    try {
      const res = this.$axios.$get(
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
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/products`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteProducts({}, id) {
    try {
      const res = this.$axios.$delete(
        `https://test.loftcity.uz/api/admin/products/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = this.$axios.$post(
      `https://test.loftcity.uz/api/admin/products_groups`,
      data
    );
    return res;
  },
};
