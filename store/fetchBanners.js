export const actions = {
  async getBanners({}, payload) {
    try {
      const res = await this.$axios.$get(`/banners`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getBannersById({}, id) {
    try {
      const res = await this.$axios.$get(`/banners/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postBanners({}, data) {
    const res = await this.$axios.$post(`/banners`, data);
    return res;
  },
  async editBanners({}, payload) {
    try {
      const res = await this.$axios.$put(
        `/banners/${payload.id}`,
        payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteBanners({}, id) {
    try {
      const res = await this.$axios.$delete(`/banners/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getBannerType() {
    const res = await this.$axios.$get(`/banners/types`);
    return res;
  },
};
