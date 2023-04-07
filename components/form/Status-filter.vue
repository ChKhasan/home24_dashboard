<template lang="html">
  <div class="input status-select">
    <el-select v-model="value" placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: 2,
          label: "All",
        },
        {
          value: 1,
          label: "Active",
        },
        {
          value: 0,
          label: "Inactive",
        },
      ],
      value: 2,
    };
  },
};
</script>
<style lang=""></style>
