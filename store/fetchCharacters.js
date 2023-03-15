export const actions = {
  async getCharacteristics({}, payload) {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/characteristics`,
        { params: payload }
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getCharacteristicsById({}, id) {
    try {
      const res = await this.$axios.$get(
        `https://test.loftcity.uz/api/admin/characteristics/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postCharacteristics({}, data) {
    try {
      const res = await this.$axios.$post(
        `https://test.loftcity.uz/api/admin/characteristics`,
        data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async editCharacteristics({}, payload) {
    try {
      const res = await this.$axios.$put(
        `https://test.loftcity.uz/api/admin/characteristics/${payload.id}`,
        payload.data
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async deleteCharacteristics({}, id) {
    try {
      const res = await this.$axios.$delete(
        `https://test.loftcity.uz/api/admin/characteristics/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = await this.$axios.$post(
      `https://test.loftcity.uz/api/admin/characteristics_groups`,
      data
    );
    return res;
  },
  async getGroups({}, payload) {
    const res = await this.$axios.$get(
      `https://test.loftcity.uz/api/admin/characteristics_groups/all`,
      { params: payload }
    );
    return res;
  },
  async deleteGroups({}, id) {
    const res = await this.$axios.$delete(
      `https://test.loftcity.uz/api/admin/characteristics/${id}`
    );
    return res;
  },
};
