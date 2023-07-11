export const actions = {
  async getBrands({}, payload) {
    const res = await this.$axios.$get(`/brands`, { params: payload });
    return res;
  },
  async getAllBrands() {
    const res = await this.$axios.$get(`/brands/all`);
    return res;
  },
  async getBrandsById({}, id) {
    try {
      const res = await this.$axios.$get(`/brands/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postBrands({}, data) {
    const res = await this.$axios.$post(`/brands`, data);
    return res;
  },
  async editBrands({}, payload) {
    const res = await this.$axios.$put(`/brands/${payload.id}`, payload.data);
    return res;
  },
  async deleteBrands({}, id) {
    const res = await this.$axios.$delete(`/brands/${id}`);
    return res;
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(`/brands_groups`, data);
    return res;
  },
  async getGroups() {
    const res = await this.$axios.$get(`/brands_groups/all`);
    return res;
  },
};
