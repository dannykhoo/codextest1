import {
  TabulatorFull as Tabulator
} from "tabulator-tables"

//import "tabulator-tables/dist/css/tabulator_materialize.min.css";

//import "tabulator-tables/dist/css/tabulator_modern.min.css";

import {
  boot
} from 'quasar/wrappers'

//import VueZoomer from 'vue-zoomer'





export default boot(({
  app
}) => {
  app.config.globalProperties.$tabulator = Tabulator

  // app.use(VueZoomer)


})
