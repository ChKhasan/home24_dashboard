<template lang="">
  <modal :adaptive="true" :name="name" width="546px" :clickToClose="false" height="auto" :ref="refName">
    <div>
      <div class="add_modal-container">
        <div class="add_modal-header">
          <div class="modal-title">
            <h2>{{ title }}</h2>
          </div>
        </div>
        <div class="add_modal-body">
          <slot></slot>
        </div>
        <div class="add_modal-footer d-flex justify-content-end">
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="hide(name)"
          >
            Cancel
          </div>
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-primary"
            @click="execute"
          >
            <span class="svg-icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <polygon points="0 0 24 0 24 24 0 24"></polygon>
                  <path
                    d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
                    fill="#000000"
                    fill-rule="nonzero"
                    opacity="0.3"
                  ></path>
                  <path
                    d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z"
                    fill="#000000"
                  ></path>
                </g></svg
            ></span>
            {{ btnText }}
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  props: {
    callback: {
      type: Function,
    },
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    btnText: {
      type: String,
    },
    refName: {
      type: String
    }
  },
  methods: {
    show(name) {
      this.$modal.show(name);
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100vh";
    },
    hide(name) {
      this.$modal.hide(name);
      document.body.style.overflowY = "auto";
      document.body.style.height = "auto";
    },
    execute() {
      if (this.callback) {
        this.callback();
      }
    },
  },
};
</script>
<style lang=""></style>
