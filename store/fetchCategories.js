export const actions = {
  async getCategories({}, payload) {
    try {
      const res = await this.$axios.$get(`/categories`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postCategories({}, data) {
    const res = await this.$axios.$post(`/categories`, data);
    return res;
  },
  async getCategoriesById({}, id) {
    try {
      const res = await this.$axios.$get(`/categories/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editCategories({}, payload) {
    const res = await this.$axios.$put(
      `/categories/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteCategories({}, id) {
    const res = await this.$axios.$delete(`/categories/${id}`);
    return res;
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(`/categories_groups`, data);
    return res;
  },
};
