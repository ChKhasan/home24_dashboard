export const actions = {
  async getCategories({}, payload) {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/categories`,
        { params: payload }
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postCategories({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/categories`,
      data
    );
    return res;
  },
  async getCategoriesById({}, id) {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/categories/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editCategories({}, payload) {
    const res = await this.$axios.$put(
      `https://test.loftcity.uz/api/admin/categories/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteCategories({}, id) {
    const res = await this.$axios.$delete(
      `https://test.loftcity.uz/api/admin/categories/${id}`
    );
    return res;
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/categories_groups`,
      data
    );
    return res;
  },
};
