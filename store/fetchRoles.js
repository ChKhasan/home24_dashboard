export const actions = {
  async getRoles({}, payload) {
    try {
      const res = await this.$axios.$get(`/roles`, {
        params: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getRolesById({}, id) {
    try {
      const res = await this.$axios.$get(`/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postRoles({}, data) {
    try {
      const res = await this.$axios.$post(`/roles`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editRoles({}, payload) {
    try {
      const res = await this.$axios.$put(`/roles/${payload.id}`, payload.data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteRoles({}, id) {
    try {
      const res = await this.$axios.$delete(`/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(`/roles_groups`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getGroups() {
    const res = await this.$axios.$get(`/roles_groups/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
};
