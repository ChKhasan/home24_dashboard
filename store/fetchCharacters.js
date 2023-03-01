export const actions = {
  async getCharacters() {
    try {
      const res = this.$axios.$get(
        `https://jsonplaceholder.typicode.com/todos/1`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
};
