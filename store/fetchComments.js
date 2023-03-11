export const actions = {
    async getComments({},payload) {
      try {
        const res = this.$axios.$get(
          `https://test.loftcity.uz/api/admin/comments`,{params: payload}
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async getCommentsById({}, id) {
      try {
        const res = this.$axios.$get(
          `https://test.loftcity.uz/api/admin/comments/${id}`
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async postComments({}, data) {
      try {
        const res = this.$axios.$post(
          `https://test.loftcity.uz/api/admin/comments`,
          data
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async editComments({}, payload) {
      try {
        const res = this.$axios.$put(
          `https://test.loftcity.uz/api/admin/comments/${payload.id}`,payload.data
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async deleteComments({}, id) {
      try {
        const res = this.$axios.$delete(
          `https://test.loftcity.uz/api/admin/comments/${id}`
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async postGroups({}, data) {
      const res = this.$axios.$post(
        `https://test.loftcity.uz/api/admin/comments_groups`,
        data
      );
      return res;
    },
    async getGroups() {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/comments_groups/all`
      );
      return res;
    },
  };
  