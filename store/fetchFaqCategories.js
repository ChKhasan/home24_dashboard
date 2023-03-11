export const actions = {
  async getFaqsCategories({}, payload) {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/faqs_categories`,
        { params: payload }
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getFaqsCategoriesById({}, id) {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/faqs_categories/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postFaqsCategories({}, data) {
    try {
      const res = this.$axios.$post(
        `https://test.loftcity.uz/api/admin/faqs_categories`,
        data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editFaqsCategories({}, payload) {
    try {
      const res = this.$axios.$put(
        `https://test.loftcity.uz/api/admin/faqs_categories/${payload.id}`,
        payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteFaqsCategories({}, id) {
    try {
      const res = this.$axios.$delete(
        `https://test.loftcity.uz/api/admin/faqs_categories/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = this.$axios.$post(
      `https://test.loftcity.uz/api/admin/faqs_categories_groups`,
      data
    );
    return res;
  },
  async getGroups() {
    const res = this.$axios.$get(
      `https://test.loftcity.uz/api/admin/faqs_categories_groups/all`
    );
    return res;
  },
};
