export const actions = {
  async getClients({}, data) {
    const res = await this.$axios.$get(`/clients`, data);
    return res;
  },
  async showClients({}, id) {
    const res = await this.$axios.$get(`/clients/${id}`);
    return res;
  },
};
