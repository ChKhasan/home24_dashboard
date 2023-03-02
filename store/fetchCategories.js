export const actions = {
  async getCategories() {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/categories`
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
  async editCategories() {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/categories`
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
