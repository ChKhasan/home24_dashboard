export const actions = {
  async getCategories({},payload) {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/categories`,{ params: payload }
        
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postCategories({}, data) {
    try {
      const res = this.$axios.$post(
        `https://test.loftcity.uz/api/admin/categories`,
        data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getCategoriesById({}, id) {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/categories/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editCategories({},payload) {
    try {
      const res = this.$axios.$put(
        `https://test.loftcity.uz/api/admin/categories/${payload.id}`,payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteCategories({}, id) {
    try {
      const res = this.$axios.$delete(
        `https://test.loftcity.uz/api/admin/categories/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = this.$axios.$post(
      `https://test.loftcity.uz/api/admin/categories_groups`,
      data
    );
    return res;
  },
};
