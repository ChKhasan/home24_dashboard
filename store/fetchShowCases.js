export const actions = {
  async getShowCasesById({}, payload) {
    try {
      const res = await this.$axios.$get(`/showcases/${payload}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getShowCasesAll({}, payload) {
    try {
      const res = await this.$axios.$get(`/showcases/all`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editShowCases({}, payload) {
    try {
      const res = await this.$axios.$put(
        `/showcases/${payload.id}`,
        payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
};
