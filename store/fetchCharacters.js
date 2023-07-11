export const actions = {
  async getCharacteristics({}, payload) {
    try {
      const res = await this.$axios.$get(`/characteristics`, {
        params: payload,
      });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getOptions({}, payload) {
    try {
      const res = await this.$axios.$get(`/characteristics_options`, {
        params: payload,
      });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postOptions({}, data) {
    try {
      const res = await this.$axios.$post(
        `/characteristics_options/store_more`,
        data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getCharacteristicsById({}, id) {
    try {
      const res = await this.$axios.$get(`/characteristics/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postCharacteristics({}, data) {
    try {
      const res = await this.$axios.$post(`/characteristics`, data);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editCharacteristics({}, payload) {
    try {
      const res = await this.$axios.$put(
        `/characteristics/${payload.id}`,
        payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteCharacteristics({}, id) {
    try {
      const res = await this.$axios.$delete(`/characteristics/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(`/characteristics_groups`, data);
    return res;
  },
  async getGroups({}, payload) {
    const res = await this.$axios.$get(`/characteristics_groups/all`, {
      params: payload,
    });
    return res;
  },
  async deleteGroups({}, id) {
    const res = await this.$axios.$delete(`/characteristics/${id}`);
    return res;
  },
};
