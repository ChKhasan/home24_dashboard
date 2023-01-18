<template lang="html">
  <div>
    <TitleBlock
      title="Product Form"
      :breadbrumb="['Home', 'Products']"
      lastLink="Product Form"
    />
    <div class="container_xl app-container">
      <div class="add-product">
        <div class="card_block py-5">
          <div class="card_header">
            <h2 class="card_block-title">General</h2>
          </div>
          <div class="card_block_padd">
            <!-- input blocks -->
            <div class="input-block mb-10">
              <label for="" class="form-label required">Product Name</label>
              <input type="text" class="form-control form-input mb-2" />
              <div class="text-muted fs-7">
                A product name is required and recommended to be unique.
              </div>
            </div>
            <div class="input-block mb-10">
              <label for="" class="form-label required">Model</label>
              <input type="text" class="form-control form-input mb-2" />
            </div>
            <!-- input blocks -->
            <!-- checkbox group -->
            <div class="checkbox-grid">
              <div class="">
                <label
                  class="btn btn-outline btn-outline-dashed pr-15r pl-15r pb-15r pt-15r d-flex text-start p-6 active"
                >
                  <label class="checkbox-container">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>

                  <span class="checkbox-label">Popular</span>
                </label>
              </div>
              <div class="">
                <label
                  class="btn btn-outline btn-outline-dashed pr-15r pl-15r pb-15r pt-15r d-flex text-start p-6 active"
                >
                  <label class="checkbox-container">
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>

                  <span class="checkbox-label">Popular</span>
                </label>
              </div>
            </div>
            <!-- checkbox group -->
            <!-- Tab -->
            <el-tabs class="mt-5" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="Description" name="first">
                <Editor
              /></el-tab-pane>
              <el-tab-pane label="Information" name="second">
                <Editor />
              </el-tab-pane>
            </el-tabs>
            <!-- Tab -->
          </div>
        </div>
        <div class="card_block py-5">
          <div class="card_header">
            <h2 class="card_block-title">Status</h2>
          </div>
          <div class="card_block_padd">
            <div class="input-block mb-10">
              <!-- <input type="text" class="form-control form-input mb-2" /> -->
              <el-select v-model="value" class="mb-2" placeholder="Select">
                <el-option
                  class="form-select-input"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div class="text-muted fs-7">
                Set the product status.
              </div>
            </div>
          </div>
          <div class="card_header">
            <h2 class="card_block-title">Product Details</h2>
          </div>
          <div class="card_block_padd">
            <div class="input-block mb-10">
              <label for="" class="form-label">Category</label>
              <!-- <input type="text" class="form-control form-input mb-2" /> -->
              <el-select v-model="value" class="mb-2" placeholder="Select">
                <el-option
                  class="form-select-input"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div class="text-muted fs-7">
                Add product to a category.
              </div>
            </div>
            <div class="input-block mb-10">
              <label for="" class="form-label">Post Category</label>
              <!-- <input type="text" class="form-control form-input mb-2" /> -->
              <el-select v-model="value" class="mb-2" placeholder="Select">
                <el-option
                  class="form-select-input"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div class="text-muted fs-7">
                Add product to a category.
              </div>
            </div>
            <div class="input-block mb-10">
              <label for="" class="form-label">Last Category</label>
              <!-- <input type="text" class="form-control form-input mb-2" /> -->
              <el-select v-model="value" class="mb-2" placeholder="Select">
                <el-option
                  class="form-select-input"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div class="text-muted fs-7">
                Add product to a category.
              </div>
            </div>
            <div class="mb-10">
              <FilterBtn
                name="Create new category
							"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    opacity="0.5"
                    x="11"
                    y="18"
                    width="12"
                    height="2"
                    rx="1"
                    transform="rotate(-90 11 18)"
                    fill="currentColor"
                  ></rect>
                  <rect
                    x="6"
                    y="11"
                    width="12"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  ></rect></svg
              ></FilterBtn>
            </div>
            <div class="input-block mb-10">
              <label for="" class="form-label">Brand</label>
              <!-- <input type="text" class="form-control form-input mb-2" /> -->
              <el-select v-model="value" class="mb-2" placeholder="Select">
                <el-option
                  class="form-select-input"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div class="text-muted fs-7">
                Add product to a category.
              </div>
            </div>
            <FilterBtn
              name="Create new category
							"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  opacity="0.5"
                  x="11"
                  y="18"
                  width="12"
                  height="2"
                  rx="1"
                  transform="rotate(-90 11 18)"
                  fill="currentColor"
                ></rect>
                <rect
                  x="6"
                  y="11"
                  width="12"
                  height="2"
                  rx="1"
                  fill="currentColor"
                ></rect></svg
            ></FilterBtn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Editor from "../../components/form/editor.vue";
import FilterBtn from "../../components/form/Filter-btn.vue";
import TitleBlock from "../../components/Title-block.vue";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 80,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address 1",
    ellipsis: true,
  },
  {
    title: "Long Column Long Column Long Column",
    dataIndex: "address",
    key: "address 2",
    ellipsis: true,
  },
  {
    title: "Long Column Long Column",
    dataIndex: "address",
    key: "address 3",
    ellipsis: true,
  },
  {
    title: "Long Column",
    dataIndex: "address",
    key: "address 4",
    ellipsis: true,
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 2 Lake Park, London No. 2 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
export default {
  layout: "toolbar",
  data() {
    return {
      data,
      columns,
      activeName: "first",
      option: {
        theme: "bubble",
        modules: {
          toolbar: [
            ["bold", "italic", "link"],
            [
              {
                header: 1,
              },
              {
                header: 2,
              },
              "blockquote",
            ],
          ],
        },
      },
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      value: "------------",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  components: { Editor, FilterBtn, TitleBlock },
};
</script>
<style lang="scss">
.add-product {
  display: grid;
  grid-template-columns: 670px auto;
  grid-gap: 13px;
}
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4rem;
}
</style>
