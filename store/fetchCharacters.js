export const actions = {
  async getCharacteristics() {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/characteristics`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getCharacteristicsById({}, id) {
    try {
      const res = this.$axios.$get(
        `https://test.loftcity.uz/api/admin/characteristics/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postCharacteristics({}, data) {
    try {
      const res = this.$axios.$post(
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
      const res = this.$axios.$put(
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
      const res = this.$axios.$delete(
        `https://test.loftcity.uz/api/admin/characteristics/${id}`
      );
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postGroups({}, data) {
    const res = this.$axios.$post(
      `https://test.loftcity.uz/api/admin/characteristics_groups`,
      data
    );
    return res;
  },
  async getGroups() {
    const res = this.$axios.$get(
      `https://test.loftcity.uz/api/admin/characteristics_groups/all`
    );
    return res;
  },
  async deleteGroups({},id) {
    const res = this.$axios.$delete(
      `https://test.loftcity.uz/api/admin/characteristics/${id}`
    );
    return res;
  },
};
