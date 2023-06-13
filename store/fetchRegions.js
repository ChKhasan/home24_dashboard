export const actions = {
  async getRegions({}, payload) {
    try {
      const res = await this.$axios.$get(`/regions`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getRegionsById({}, id) {
    const res = await this.$axios.$get(`/regions/${id}`);
    return res;
  },
  async postRegions({}, data) {
    const res = await this.$axios.$post(`/regions`, data);
    return res;
  },
  async editRegions({}, payload) {
    try {
      const res = await this.$axios.$put(
        `/regions/${payload.id}`,
        payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteRegions({}, id) {
    try {
      const res = await this.$axios.$delete(`/regions/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getBannerType() {
    const res = await this.$axios.$get(`/regions/types`);
    return res;
  },
};
