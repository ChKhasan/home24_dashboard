<template lang="html">
  <div class="wrapper">
    {{ items }}
    {{ itemsNum }}
    <drop-list
      :items="itemsNum"
      class="list"
      @insert="($event) => onInsert($event, 'itemsNum')"
      @reorder="$event.apply(itemsNum)"
    >
      <template v-slot:item="{ item }">
        <drag class="item" :key="item" :data="item">{{ item }}</drag>
      </template>
      <template v-slot:feedback="{ data }">
        <div class="item feedback" :key="data">{{ data }}</div>
      </template>
    </drop-list>
    <drop-list
      :items="items"
      class="list"
      @insert="($event) => onInsert($event, 'items')"
      @reorder="$event.apply(items)"
    >
      <template v-slot:item="{ item }">
        <drag class="item" :key="item" :data="item">{{ item }}</drag>
      </template>
      <template v-slot:feedback="{ data }">
        <div class="item feedback" :key="data">{{ data }}</div>
      </template>
    </drop-list>
  </div>
</template>
<script>
import { Drag, DropList } from "vue-easy-dnd";
export default {
  data() {
    return {
      items: ["a", "b", "c", "d", "e"],
      itemsNum: [1, 2, 3, 4, 5],
      itemsNum1: [11, 22, 33, 44, 55],
    };
  },
  methods: {
    onInsert(event, arr) {
      this[arr].splice(event.index, 0, event.data);
    },
  },
  components: {
    Drag,
    DropList,
  },
};
</script>
<style lang="scss">
html,
body,
#app,
.v-application--wrap,
.v-content,
.v-content__wrap {
  height: 100%;
}

.drop-in {
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.3);
}
.wrapper {
  display: flex;
  .list {
    border: 1px solid black;
    margin: 100px auto;
    width: 200px;

    .item {
      padding: 20px;
      margin: 10px;
      background-color: rgb(220, 220, 255);
      display: flex;
      align-items: center;
      justify-content: center;

      &.feedback {
        background-color: rgb(255, 220, 220);
        border: 2px dashed black;
      }

      &.drag-image {
        background-color: rgb(220, 255, 220);
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
