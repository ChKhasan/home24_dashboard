export const actions = {
  async getAtributes({},payload) {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/attributes`,{ params: payload }
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getAtributesById({}, id) {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/attributes/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postAtributes({}, data) {
    try {
      const res = this.$axios.$post(
        `https://test.loftcity.uz/api/admin/attributes`,
        data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editAtributes({}, payload) {
    try {
      const res = this.$axios.$put(
        `https://test.loftcity.uz/api/admin/attributes/${payload.id}`,payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteAtributes({}, id) {
    try {
      const res = this.$axios.$delete(
        `https://test.loftcity.uz/api/admin/attributes/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = this.$axios.$post(
      `https://test.loftcity.uz/api/admin/attributes_groups`,
      data
    );
    return res;
  },
  async getGroups() {
    const res = this.$axios.$get(
      `https://test.loftcity.uz/api/admin/attributes_groups/all`
    );
    return res;
  },
};
