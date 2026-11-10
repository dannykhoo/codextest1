export const mxMet = {
  methods: {

    async searchData() {
      let data = await this.conn('/stockadjustment/get.php', {
        action: 'searchData',
        input: this.input,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
      })
      if (data.success) {
        this.table1.setData(data.rsData)
      }
    },
    onNew() {
      this.$refs.adjustmentForm.initLoad('new', null)
    },
    viewData(data) {
     // this.$refs.adjustmentForm.initLoad('update', data.UID)
      this.$refs.productForm.initLoad('update', data.product_uid)
    },



  }
};
