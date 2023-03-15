export const actions = {
  async getBanners() {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/banners`
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
    try {
      const res = await this.$axios.$post(
        `https://test.loftcity.uz/api/admin/banners`,
        data
      );
      return res;
    } catch (e) {
      return e.response;
    }
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
  async postGroups({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/banners_groups`,
      data
    );
    return res;
  },
  async getGroups() {
    const res = await this.$axios.$get(
      `https://test.loftcity.uz/api/admin/banners_groups/all`
    );
    return res;
  },
};
