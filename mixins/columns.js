export default {
  data() {
    return {
      columnAtribut: [
        {
          title: "АТРИБУТЫ",
          dataIndex: "info",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "info" },
          className: "column-name",
          key: "info",
          width: "30%",
        },
        {
          title: "Параметры",
          dataIndex: "options",
          scopedSlots: { customRender: "options" },
          className: "column-options",
          key: "options",
        },
        {
          title: "Категории",
          dataIndex: "categories",
          scopedSlots: { customRender: "categories" },
          className: "column-options",
          key: "categories",
        },

        {
          title: "ДЕЙСТВИЯ",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          width: "100px",
          key: "id",
          align: "right",
        },
      ],
      columnBrand: [
        {
          title: "№",
          dataIndex: "key",
          key: "key",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "key" },
          align: "left",
          className: "column-name",
          width: "60px",
        },
        {
          title: "Бренд",
          dataIndex: "lg_logo",
          key: "lg_logo",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "img" },
          align: "left",
          className: "column-img",
          colSpan: 2,
          width: "45px",
        },
        {
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
          className: "column-name",
          width: "30%",
          colSpan: 0,
        },

        {
          title: "действия",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          //   width: "10%",
          align: "right",
        },
      ],
      columnCatgory: [
        {
          title: "Категория",
          dataIndex: "dataName",
          key: "dataName",
          className: "column-name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "dataName" },
          align: "left",
        },
        {
          title: "Икона",
          dataIndex: "lg_icon",
          slots: { title: "customTitle" },
          align: "center",
          scopedSlots: { customRender: "lg_icon" },
          className: "column-name",
          key: "lg_icon",
          width: "12%",
        },
        {
          title: "ПОПУЛЯРНЫЙ",
          dataIndex: "is_popular",
          key: "is_popular",
          align: "center",
          scopedSlots: { customRender: "is_popular" },
          className: "column-tags",
          width: "15%",
        },
        {
          title: "Статус",
          key: "is_active",
          dataIndex: "is_active",
          scopedSlots: { customRender: "is_active" },
          className: "column-tags",
          width: "10%",
        },
        {
          title: "действия",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          width: "100px",
        },
      ],
      columnCharacteristic: [
        {
          title: "№",
          dataIndex: "key",
          key: "key",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "key" },
          align: "left",
          className: "column-name",
          width: "60px",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
          align: "left",
          className: "column-name",
        },

        {
          title: "действия",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          width: "100px",
          align: "right",
        },
      ],
      columnProduct: [
        {
          title: "ПРОДУКТ",
          dataIndex: "img",
          key: "img",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "img" },
          // width: "8%",
          align: "left",
          className: "column-img",
          colSpan: 2,
        },
        {
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
          className: "column-name",
          width: "30%",
          colSpan: 0,
        },
        {
          title: "Код",
          dataIndex: "model",
          scopedSlots: { customRender: "model" },
          className: "column-code",
          key: "model",
          width: "10%",
        },
        {
          title: "КОЛ-ВО",
          dataIndex: "qty",
          className: "column-qty",
          scopedSlots: { customRender: "qty" },
          key: "qty",
          align: "center",
          width: "10%",
          sorter: (a, b) => a.qty - b.qty,
        },
        {
          title: "ЦЕНА",
          dataIndex: "price",
          className: "column-price",
          key: "price",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "price" },
          width: "16%",
          sorter: (a, b) => a.price - b.price,
        },
        {
          title: "Статус",
          key: "status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          className: "column-tags",
          filters: [
            { text: "Active", value: "active" },
            { text: "Inactive", value: "inactive" },
          ],
          onFilter: (value, record) => record.status.indexOf(value) === 0,
          width: "16%",
        },
        {
          title: "действия",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          width: "10%",
          align: "right",
        },
      ],
      columnProduct: [
        {
          title: "PRODUCT",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "img" },
          align: "left",
          className: "column-name",
          width: "55px",
          colSpan: 2,
        },
        {
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "product" },
          align: "left",
          className: "column-name",
          colSpan: 0,
        },
        {
          title: "ИМЯ",
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
          align: "left",
          className: "column-name",
        },
        {
          title: "ДАТА",
          dataIndex: "created_at",
          key: "created_at",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "created_at" },
          className: "column-name",
        },
        {
          title: "НОМЕР ТЕЛЕФОНА",
          dataIndex: "phone_number",
          scopedSlots: { customRender: "phone_number" },
          className: "column-price",
          key: "model",
          width: "10%",
        },
        {
          title: "действия",
          key: "id",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          className: "column-btns",
          width: "10%",
          align: "right",
        },
      ],
    };
  },
};
