export const mxTable = {
  methods: {
    createTable1() {
      let vm = this
      this.table1 = new vm.$tabulator(vm.$refs.table1, {
        data: [],
        selectableRows: 1,
        index: 'product_uid',
        persistenceID: "StockAdjustmentEntry",
        ...this.objDefault.table,
        columns: [{
          title: "UID",
          field: "product_uid",
          headerFilter: "input",
          visible: false
        },
        {
          title: "SA No.",
          field: "sa_no",
          headerFilter: "input",
        },
        {
          title: "product_uid",
          field: "product_uid",
          headerFilter: "input",
          visible: false
        },
        {
          title: "SKU",
          field: "sku",
          headerFilter: "input",
        },
        {
          title: "Product Name",
          field: "product_name",
          headerFilter: "input",
        },
        {
          title: "Type",
          field: "type",
          headerFilter: "input",
        },
        {
          title: "Qty",
          field: "qty",
          headerFilter: "input",
          hozAlign: "right",
          bottomCalc: "sum",
          formatter: function (cell, formatterParams, onRendered) {
            let data = cell.getData()
            if (cell.getValue() < 0) {
              return `<div class="text-red">${vm.toQty(cell.getValue(), data.rounding_qty)}</div>`
            } else {
              return "<div >" + vm.toQty(cell.getValue(), data.rounding_qty) + "</div>"
            }
          },
        },
        {
          title: "Cost",
          field: "cost",
          headerFilter: "input",
          formatter: "money",
          formatter: function (cell, formatterParams, onRendered) {
            return vm.toCost(cell.getValue())
          },
        },
        {
          title: "Reason",
          field: "reason",
          headerFilter: "input",
        },
        {
          title: "Remark",
          field: "remark",
          headerFilter: "input",
        },
        {
          title: "By",
          field: "created_name",
          headerFilter: "input",
        },
        {
          title: "Date",
          field: "created_date",
          headerFilter: "input",
        }
        ]
      })
      this.table1.on("tableBuilt", function () {
        vm.setColumnResizeable(vm.table1)
      })
      this.table1.on("cellDblClick", function (e, cell) {
        vm.viewData(cell.getData())
      })
      this.table1.on("columnResized", function (column) {
        var columnLayout = vm.table1.getColumnLayout();
        vm.table1.setColumnLayout(columnLayout)
      })
    },


  },


}
