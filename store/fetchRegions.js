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
  async postRegionsGroup({}, data) {
    const res = await this.$axios.$post(`/region_groups`, data);
    return res;
  },
  async putRegionsGroup({}, payload) {
    const res = await this.$axios.$put(
      `/region_groups/${payload.id}`,
      payload.data
    );
    return res;
  },
  async getRegionsGroups({}, payload) {
    try {
      const res = await this.$axios.$get(`/region_groups`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getRegionsGroupsById({}, id) {
    try {
      const res = await this.$axios.$get(`/region_groups/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteRegionsGroup({}, id) {
    try {
      const res = await this.$axios.$delete(`/region_groups/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
};
