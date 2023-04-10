export const actions = {
  async getBanners({}, payload) {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/banners`,
        { params: payload }
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getBannersById({}, id) {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/banners/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postBanners({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/banners`,
      data
    );
    return res;
  },
  async editBanners({}, payload) {
    try {
      const res = await this.$axios.$put(
        `https://test.loftcity.uz/api/admin/banners/${payload.id}`,
        payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteBanners({}, id) {
    try {
      const res = await this.$axios.$delete(
        `https://test.loftcity.uz/api/admin/banners/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getBannerType() {
    const res = await this.$axios.$get(
      `https://test.loftcity.uz/api/admin/banners/types`
    );
    return res;
  },
};
