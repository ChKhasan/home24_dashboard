<template lang="html">
  <div class="input status-select">
    <el-select
      v-model="value"
      placeholder="Статус"
      @change="($event) => $emit('changeStatus', $event)"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      options: [
        {
          value: 2,
          label: "All",
        },
        {
          value: 1,
          label: "Активный",
        },
        {
          value: 0,
          label: "Неактивный",
        },
      ],
      value: "",
    };
  },
};
</script>
