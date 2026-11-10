export const mxMet = {
  methods: {
    initLoad(cpAction, cpID, product) {
      console.log("product", product)
      this.cpAction = cpAction
      this.cpID = cpID
      this.resetData()
      if (cpAction == 'new') {
        this.readonly = false
        if (product) {
          this.data.product_uid = product.product_uid
          this.data.sku = product.sku
          this.data.product_name = product.product_name
        }
      } else {
        this.readonly = true
        this.getData(cpID)
      }
      this.cpModal = true
    },
    resetData() {
      this.data = {
        product_uid: '',
        sku: '',
        product_name: '',
        store_id: '',
        qty: 0,
        cost: 0,
        type: '',
        ref_no: '',
        remark: '',
        created_date: '',
        created_by: '',
        created_name: '',
      }
      this.optReason = JSON.parse(this.objSettings.stock_adjustment_reason)
    },
    onQtyInput() {
      if (!this.data.qty || this.data.qty == "" || Number(this.data.qty) == 0) {
        this.data.type = ''
      } else if (this.data.qty > 0) {
        this.data.type = 'Stock In'
      } else {
        this.data.type = 'Stock Out'
      }
    },
    async getData(cpID) {
      let data = await this.conn('/stockadjustment/get.php', {
        action: 'getData',
        cpID: cpID
      })
      if (data.success) {
        this.data = data.rsData
      }
    },
    async onUpdate() {
      if (this.data.qty > 0) {

      } else if (this.data.qty < 0) {

      } else {
        this.alertInfo('Please enter Qty')
        return
      }

      if (this.data.cost >= 0) {

      } else {
        this.alertInfo('Please enter cost')
        return
      }
      if (await this.confirmation('You will not be able to undo this action once it is updated', "Proceed adjustment?")) {
        this.onSave()
      }
    },
    async onSave() {
      let data = await this.conn('/stockadjustment/update.php', {
        action: 'update',
        data: this.data
      })
      if (data.success) {
        this.$emit('saved', this.data)
        this.alertSuccess('Record saved')
        this.cpModal = false
      }
    },

    onProduct() {
      this.$refs.selectProduct.initLoad('Product', false, false)
    },
    onProductSelected(data) {
      console.log('onProductSelected', data)
      this.data.product_name = data.ar_product.product_name
      this.data.product_uid = data.ar_product.product_uid
      this.data.sku = data.ar_product.sku
      this.data.cost = data.ar_product.cost
    },




  },
}
