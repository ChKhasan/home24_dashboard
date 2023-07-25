export const actions = {
  async getPromotions({}, payload) {
    try {
      const res = await this.$axios.$get(`/promotions`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getPromotionsById({}, id) {
    try {
      const res = await this.$axios.$get(`/promotions/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postPromotions({}, data) {
    const res = await this.$axios.$post(`/promotions`, data);
    return res;
  },
  async editPromotions({}, payload) {
    try {
      const res = await this.$axios.$put(
        `/promotions/${payload.id}`,
        payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deletePromotions({}, id) {
    try {
      const res = await this.$axios.$delete(`/promotions/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
};
