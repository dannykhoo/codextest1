export const mxData = {
  data() {
    return {
      table1: null,
      // table1Data: [],
      field: 'Product Name',
      input: '',
      dateFrom: this.getDate(null, 'monthfirstday'),
      dateTo: this.getDate(),
      optStatus: ['Active', 'Inactive'],
      status: ['Active'],
      toggleSelect: true,

      optCategory: [],
      optTags: [],
      arCategory: [],
      arTags: [],





    };
  }
};
