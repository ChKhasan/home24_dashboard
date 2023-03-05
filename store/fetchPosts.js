export const actions = {
    async getPosts() {
      try {
        const res = this.$axios.$get(
          `https://test.loftcity.uz/api/admin/posts`
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async getPostsById({}, id) {
      try {
        const res = this.$axios.$get(
          `https://test.loftcity.uz/api/admin/posts/${id}`
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async postPosts({}, data) {
      try {
        const res = this.$axios.$post(
          `https://test.loftcity.uz/api/admin/posts`,
          data
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async editPosts({}, payload) {
      try {
        const res = this.$axios.$put(
          `https://test.loftcity.uz/api/admin/posts/${payload.id}`,payload.data
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async deletePosts({}, id) {
      try {
        const res = this.$axios.$delete(
          `https://test.loftcity.uz/api/admin/posts/${id}`
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async postGroups({}, data) {
      const res = this.$axios.$post(
        `https://test.loftcity.uz/api/admin/posts_groups`,
        data
      );
      return res;
    },
    async getGroups() {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/posts_groups/all`
      );
      return res;
    },
  };
  