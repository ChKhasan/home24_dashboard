export const actions = {
  async postDiCoin({}, data) {
    const res = await this.$axios.$post(`/dicoin`, data);
    return res;
  },
  async showDiCoin() {
    const res = await this.$axios.$get(`/dicoin`);
    return res;
  },
};
