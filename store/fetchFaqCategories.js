export const actions = {
  async getFaqsCategories({}, payload) {
    try {
      const res = await this.$axios.$get(`/faqs_categories`, {
        params: payload,
      });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getFaqsCategoriesById({}, id) {
    try {
      const res = await this.$axios.$get(`/faqs_categories/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postFaqsCategories({}, data) {
    try {
      const res = await this.$axios.$post(`/faqs_categories`, data);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editFaqsCategories({}, payload) {
    try {
      const res = await this.$axios.$put(
        `/faqs_categories/${payload.id}`,
        payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteFaqsCategories({}, id) {
    try {
      const res = await this.$axios.$delete(`/faqs_categories/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(`/faqs_categories_groups`, data);
    return res;
  },
  async getGroups() {
    const res = await this.$axios.$get(`/faqs_categories_groups/all`);
    return res;
  },
};
