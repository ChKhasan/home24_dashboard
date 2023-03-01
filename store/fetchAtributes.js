export const actions = {
  async getAtributes() {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/attributes`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postAtributes({}, data) {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/attributes`,
        data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editAtributes() {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/attributes`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteAtributes() {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/attributes`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
};
