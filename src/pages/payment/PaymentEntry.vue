<template>
  <div>
    <div class="row">
      <div class="col-12 bg-c4 text-c5 font-2 text-bold q-pa-sm ">
        <q-btn color="white" text-color="c5" dense round icon="navigate_before" @click="$router.go(-1)" />
        Stock Adjustment
      </div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
        <q-input outlined v-model="dateFrom" mask="####-##-##" label="From" class="q-ma-xs" readonly>
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateFrom" transition-show="scale" transition-hide="scale">
                <q-date v-model="dateFrom" mask="YYYY-MM-DD" color="blue-grey-6" today-btn
                  @update:model-value="() => $refs.qDateFrom.hide()" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
        <q-input outlined v-model="dateTo" mask="####-##-##" label="To" class="q-ma-xs" readonly>
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateTo" transition-show="scale" transition-hide="scale">
                <q-date v-model="dateTo" @update:model-value="() => $refs.qDateTo.hide()" mask="YYYY-MM-DD"
                  color="blue-grey-6" today-btn />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-3">
        <q-input class="q-ma-xs" v-model="input" label="SKU / Product Name" placeholder type="search" clearable
          @keyup.enter="searchData()" autocomplete="seacrhField" stack-label outlined />
      </div>
      <q-btn icon="search" ripple color="c1" label class="text-white self-center q-ma-xs q-pa-xs" @click="searchData()"
        round>
        <q-tooltip>
          Retrieve Records
        </q-tooltip>
      </q-btn>
      <q-btn icon="add" ripple color="c1" label class="text-white self-center q-ma-xs q-pa-xs" @click="onNew()" round>
        <q-tooltip>
          New Record
        </q-tooltip>
      </q-btn>
      <q-btn color="c1" icon="file_download" class="text-white self-center q-ma-xs q-pa-xs"
        @click="exportExcel(table1, 'StockAdjustment')" round>
        <q-tooltip>
          Export to Excel
        </q-tooltip>
      </q-btn>

    </div>
    <div class="q-ma-xs" ref="table1" id="table1"></div>
  </div>
</template>

<script>
  import {
    gen
  } from "../../gf/Gen.js"
  import {
    val
  } from "../../gf/Val.js"
  import {
    mxData
  } from "./PaymentEntryData";
  import {
    mxMet
  } from "./PaymentEntryMet";
  import {
    mxTable
  } from "./PaymentEntryTable";

  import {
    useStore
  } from 'stores/basic'
  import {
    mapState
  } from 'pinia'
  export default {
    mixins: [gen, val, mxData, mxMet, mxTable],
    components: {

    },
    computed: {
      ...mapState(useStore, ['objEvent', 'objSettings', 'objDefault', 'objPermission']),
    },
    mounted() {
      document.title = "LEGASI BK8"
      this.createTable1()
    },
    created() {
      this.loadingHide()
    }
  };

</script>
<style lang="scss" scoped>
  @import "./style.css";


</style>