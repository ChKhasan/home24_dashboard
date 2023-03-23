export const actions = {
  async getFeedbacks({}, payload) {
    const res = await this.$axios.$get(
      `https://test.loftcity.uz/api/admin/feedbacks`,
      { params: payload }
    );
    return res;
  },
  async getFeedbacksById({}, id) {
    const res = await this.$axios.$get(
      `https://test.loftcity.uz/api/admin/feedbacks/${id}`
    );
    return res;
  },
  async postFeedbacks({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/feedbacks`,
      data
    );
    return res;
  },
  async editFeedbacks({}, payload) {
    const res = await this.$axios.$put(
      `https://test.loftcity.uz/api/admin/feedbacks/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteFeedbacks({}, id) {
    const res = await this.$axios.$delete(
      `https://test.loftcity.uz/api/admin/feedbacks/${id}`
    );
    return res;
  },
};
