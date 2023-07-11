export const actions = {
  async getComments({}, payload) {
    try {
      const res = await this.$axios.$get(`/comments`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getCommentsById({}, id) {
    try {
      const res = await this.$axios.$get(`/comments/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postComments({}, data) {
    try {
      const res = await this.$axios.$post(`/comments`, data);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editComments({}, payload) {
    try {
      const res = await this.$axios.$put(
        `/comments/${payload.id}`,
        payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteComments({}, id) {
    try {
      const res = await this.$axios.$delete(`/comments/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(`/comments_groups`, data);
    return res;
  },
  async getGroups() {
    const res = await this.$axios.$get(`/comments_groups/all`);
    return res;
  },
};
