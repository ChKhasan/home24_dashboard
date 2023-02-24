<template lang="html">
  <div class="form-block required">
    <div>
      <label for="">{{ label }}</label>
    </div>
    <el-form-item :prop="prop">
      <el-input v-model="value" :placeholder="placeholder"></el-input>
    </el-form-item>
    <span v-if="text" class="bottom_text">{{ text }}</span>
  </div>
</template>
<script>
export default {
  props: ["label", "text", "placeholder", "value", "prop"],
};
</script>
