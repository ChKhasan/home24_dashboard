export const actions = {
  async getAtributes({}, payload) {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/attributes`,
        { params: payload }
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getAllAtributes() {
    const res = await this.$axios.$get(
      `https://test.loftcity.uz/api/admin/attributes/all`
    );
    return res;
  },
  async getAtributesById({}, id) {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/attributes/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postAtributes({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/attributes`,
      data
    );
    return res;
  },
  async editAtributes({}, payload) {
    const res = await this.$axios.$put(
      `https://test.loftcity.uz/api/admin/attributes/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteAtributes({}, id) {
    const res = await this.$axios.$delete(
      `https://test.loftcity.uz/api/admin/attributes/${id}`
    );
    return res;
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/attributes_groups`,
      data
    );
    return res;
  },
  async getGroups() {
    const res = await this.$axios.$get(
      `https://test.loftcity.uz/api/admin/attributes_groups/all`
    );
    return res;
  },
};
