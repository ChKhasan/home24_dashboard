export const actions = {
  async getFaqs({}, payload) {
    try {
      const res = await this.$axios.$get(`/faqs`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getFaqsById({}, id) {
    try {
      const res = await this.$axios.$get(`/faqs/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postFaqs({}, data) {
    try {
      const res = await this.$axios.$post(`/faqs`, data);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editFaqs({}, payload) {
    try {
      const res = await this.$axios.$put(`/faqs/${payload.id}`, payload.data);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteFaqs({}, id) {
    try {
      const res = await this.$axios.$delete(`/faqs/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(`/faqs_groups`, data);
    return res;
  },
  async getGroups() {
    const res = await this.$axios.$get(`/faqs_groups/all`);
    return res;
  },
};
