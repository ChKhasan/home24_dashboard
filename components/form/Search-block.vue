<template lang="html">
  <div class="search-block">
    <SearchInput />
    <AddBtn name="Search" />
  </div>
</template>
<script>
import AddBtn from "./Add-btn.vue";
import SearchInput from "./Search-input.vue";

export default {
  components: { SearchInput, AddBtn },
};
</script>
