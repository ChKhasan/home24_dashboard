export const actions = {
  async getCharacters() {
    try {
      this.$axios.$get(`/api/categories`).then((res) => {
        console.log(res);
      });
      console.log(res);
    } catch (e) {}
  },
};
