export const actions = {
  async getAtributes({}, payload) {
    try {
      const res = await this.$axios.$get(`/attributes`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getAllAtributes() {
    const res = await this.$axios.$get(`/attributes/all`);
    return res;
  },
  async getAtributesById({}, id) {
    try {
      const res = await this.$axios.$get(`/attributes/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postAtributes({}, data) {
    const res = await this.$axios.$post(`/attributes`, data);
    return res;
  },
  async editAtributes({}, payload) {
    const res = await this.$axios.$put(
      `/attributes/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteAtributes({}, id) {
    const res = await this.$axios.$delete(`/attributes/${id}`);
    return res;
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(`/attributes_groups`, data);
    return res;
  },
  async getGroups() {
    const res = await this.$axios.$get(`/attributes_groups/all`);
    return res;
  },
};
