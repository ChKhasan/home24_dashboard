export const actions = {
  async getFaqs({},payload) {
    try {
      const res = await this.$axios.$get(`https://test.loftcity.uz/api/admin/faqs`,{params: payload});
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getFaqsById({}, id) {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/faqs/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postFaqs({}, data) {
    try {
      const res = await this.$axios.$post(
        `https://test.loftcity.uz/api/admin/faqs`,
        data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editFaqs({}, payload) {
    try {
      const res = await this.$axios.$put(
        `https://test.loftcity.uz/api/admin/faqs/${payload.id}`,
        payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteFaqs({}, id) {
    try {
      const res = await this.$axios.$delete(
        `https://test.loftcity.uz/api/admin/faqs/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/faqs_groups`,
      data
    );
    return res;
  },
  async getGroups() {
    const res = await this.$axios.$get(
      `https://test.loftcity.uz/api/admin/faqs_groups/all`
    );
    return res;
  },
};
