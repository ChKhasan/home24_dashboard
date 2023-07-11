export const actions = {
  async getFeedbacks({}, payload) {
    const res = await this.$axios.$get(`/feedbacks`, { params: payload });
    return res;
  },
  async getFeedbacksById({}, id) {
    const res = await this.$axios.$get(`/feedbacks/${id}`);
    return res;
  },
  async postFeedbacks({}, data) {
    const res = await this.$axios.$post(`/feedbacks`, data);
    return res;
  },
  async editFeedbacks({}, payload) {
    const res = await this.$axios.$put(
      `/feedbacks/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteFeedbacks({}, id) {
    const res = await this.$axios.$delete(`/feedbacks/${id}`);
    return res;
  },
};
