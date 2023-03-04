export const actions = {
    async getBrands() {
      try {
        const res = this.$axios.$get(
          `https://test.loftcity.uz/api/admin/brands`
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async getBrandsById({}, id) {
      try {
        const res = this.$axios.$get(
          `https://test.loftcity.uz/api/admin/brands/${id}`
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async postBrands({}, data) {
      try {
        const res = this.$axios.$post(
          `https://test.loftcity.uz/api/admin/brands`,
          data
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async editBrands({}, payload) {
      try {
        const res = this.$axios.$put(
          `https://test.loftcity.uz/api/admin/brands/${payload.id}`,payload.data
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async deleteBrands({}, id) {
      try {
        const res = this.$axios.$delete(
          `https://test.loftcity.uz/api/admin/brands/${id}`
        );
        return res;
      } catch (e) {
        return e.response;
      }
    },
    async postGroups({}, data) {
      const res = this.$axios.$post(
        `https://test.loftcity.uz/api/admin/brands_groups`,
        data
      );
      return res;
    },
    async getGroups() {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/brands_groups/all`
      );
      return res;
    },
  };
  