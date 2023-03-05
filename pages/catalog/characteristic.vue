<template lang="html">
  <div>
    <TitleBlock
      title="Характеристика"
      :breadbrumb="['эКоммерция', 'Каталог']"
      lastLink="Характеристика"
    >
      <div
        class="add-btn add-header-btn add-header-btn-padding btn-primary"
        @click="$router.push('/catalog/add_characteristic')"
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
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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
        Добавить характеристику
      </div>
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="card_block py-5">
        <div
          class="d-flex justify-content-between align-items-center card_header"
        >
          <div class="d-flex align-items-between justify-content-between w-100">
            <SearchInput placeholder="Характеристики поиска" />
            <div class="d-flex align-items-center">
              <!-- <AddBtn
                name="Добавить характеристику"
                :icon="true"
                :callback="toAddProduct"
              /> -->
            </div>
          </div>
        </div>
        <div class="antd_table product_table">
          <a-table
            :columns="columns"
            :data-source="atributes"
            :pagination="false"
            align="center"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
              columnWidth: '40px',
              align: 'right',
            }"
          >
            <a
              slot="name"
              slot-scope="text"
              align="center"
              class="table_product_row"
            >
              <h6>{{ text?.ru }}</h6>
              <span>{{ text.subtitle }}</span>
            </a>
            <div
              slot="options"
              slot-scope="text"
              align="center"
              class="option-container"
            >
              <!-- <span v-for="item in text" class="option-items">{{ item }}</span> -->
              <span class="option-items" v-for="item in text">{{
                item?.name?.ru ? item?.name?.ru : "-----"
              }}</span>
            </div>
            <span slot="customTitle"></span>

            <span slot="id" slot-scope="text">
              <span
                class="action-btn"
                @click="$router.push(`/catalog/edit_characteristic/${text}`)"
              >
                <img :src="editIcon" alt="" />
              </span>

              <a-popconfirm
                title="Are you sure delete this characteristic?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="deleteAtribut(text)"
                @cancel="cancel"
              >
                <span class="action-btn">
                  <img :src="deleteIcon" alt="" />
                </span>
              </a-popconfirm>
            </span>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddBtn from "../../components/form/Add-btn.vue";
import SearchInput from "../../components/form/Search-input.vue";
import SelectAntTable from "../../components/products/SelectAnt-table.vue";
import TitleBlock from "../../components/Title-block.vue";
import Title from "../../components/Title.vue";

export default {
  layout: "toolbar",
  data() {
    return {
      pageSize: 10,
      editIcon: require("../../assets/svg/components/edit-icon.svg"),
      deleteIcon: require("../../assets/svg/components/delete-icon.svg"),
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      atributes: [],
      columns: [
        {
          title: "характеристики",
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
          className: "column-name",
          width: "30%",
        },
        {
          title: "ПАРАМЕТРЫ",
          dataIndex: "options",
          scopedSlots: { customRender: "options" },
          className: "column-options",
          key: "options",
        },

        {
          title: "ДЕЙСТВИЯ",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          width: "100px",
          align: "right",
        },
      ],
      data: [],
    };
  },
  mounted() {
    this.__GET_CHARACTERISTIC();
  },
  methods: {
    toAddProduct() {
      this.$router.push("/catalog/add_characteristic");
      console.log("errors");
    },
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    tableActions(id) {
      console.log(id);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
    },
    handleCommand(command) {
      this.pageSize = command;
    },
    deleteAtribut(id) {
      this.__DELETE_CHARACTERISTIC(id);
    },
    cancel(e) {
      console.log(e);
      this.$message.error("Click on No");
    },
    async __DELETE_CHARACTERISTIC(id) {
      try {
        const data = await this.$store.dispatch(
          "fetchCharacters/deleteCharacteristics",
          id
        );
        await this.$notify({
          title: "Success",
          message: "Характеристика был успешно удален",
          type: "success",
        });
        this.__GET_CHARACTERISTIC();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    statusFunc(res) {
      switch (res.status) {
        case 422:
          this.$notify.error({
            title: "Error",
            message: "Указанные данные недействительны.",
          });
          break;
        case 500:
          this.$notify.error({
            title: "Error",
            message: "Cервер не работает",
          });
          break;
        case 404:
          this.$notify.error({
            title: "Error",
            message: res.data.errors,
          });
          break;
      }
    },
    async __GET_CHARACTERISTIC() {
      const data = await this.$store.dispatch(
        "fetchCharacters/getCharacteristics"
      );
      this.atributes = data.characteristics?.data;
    },
  },
  components: { SelectAntTable, AddBtn, Title, TitleBlock, SearchInput },
};
</script>
<style lang=""></style>
