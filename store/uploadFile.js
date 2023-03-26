export const actions = {
  async uploadFile({}, data) {
    const res = this.$axios.$post(
      `https://test.loftcity.uz/api/admin/files/upload`,
      data
    );
    return res;
  },
};
