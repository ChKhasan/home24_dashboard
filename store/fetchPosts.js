export const actions = {
  async getPosts({}, payload) {
    try {
      const res = await this.$axios.$get(`/posts`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getPostsById({}, id) {
    try {
      const res = await this.$axios.$get(`/posts/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postPosts({}, data) {
    try {
      const res = await this.$axios.$post(`/posts`, data);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editPosts({}, payload) {
    try {
      const res = await this.$axios.$put(`/posts/${payload.id}`, payload.data);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deletePosts({}, id) {
    try {
      const res = await this.$axios.$delete(`/posts/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(`/posts_groups`, data);
    return res;
  },
  async getGroups() {
    const res = await this.$axios.$get(`/posts_groups/all`);
    return res;
  },
};
