export const actions = {
  async uploadFile({}, data) {
    try {
      const res = this.$axios.$post(
        `https://test.loftcity.uz/api/admin/files/upload`,
        data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
 
};
