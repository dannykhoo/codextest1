<template>
  <div>
    <select-product ref="selectProduct" @done="onProductSelected"></select-product>
    <q-dialog v-model="cpModal" :maximized="$q.screen.xs">
      <q-layout view="lHh lpr lFf" container>
        <q-header elevated class="bg-white text-grey-9">
          <q-toolbar class="q-ma-none q-pa-none">
            <q-btn color="white" text-color="c2" dense round icon="navigate_before" v-close-popup class="q-ma-xs" />

            <q-btn v-if="data.type == 'Stock In'" label="Stock In" color="green" no-caps rounded class="q-ma-xs" />
            <q-btn v-if="data.type == 'Stock Out'" label="Stock Out" color="red" no-caps rounded class="q-ma-xs" />
          </q-toolbar>
          <div v-if="cpAction == 'new'" class="row bg-blue-1">
            <q-btn ripple label="Apply" color="white" text-color="blue-8" @click="onUpdate()" no-caps class="q-ma-xs"
              :disable="readonly" />
          </div>
        </q-header>
        <q-footer elevated class="bg-blue-1">
          <div class="row justify-start text-grey-10 q-pa-xs">
            <div class="col-md-6 col-sm-6 col-xs-12 " style="font-size:11px;">Created On :
              <span> {{ data.created_date }}</span>
              <span class="q-pl-xs text-grey-9 text-weight-bold">{{ data.created_name }}</span>
            </div>
            <!-- <div class="col-md-6 col-sm-6 col-xs-12 " style="font-size:11px;">Updated On :
              <span>{{ data.updated_date }}</span>
              <span class="q-pl-xs text-grey-9 text-weight-bold">{{ data.updated_name }}</span>
            </div> -->
          </div>
        </q-footer>
        <q-page-container class="bg-white">
          <q-page>
            <q-expansion-item default-opened expand-separator icon="unfold_more"
              header-class="font1 bg-pink-1 text-pink-8 " label="Information" ref="exp0">
              <div class="row ">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <q-input v-model="data.sku" label="SKU" class="q-ma-xs" readonly stack-label outlined />
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <q-input v-model="data.product_name" label="Product Name" class="q-ma-xs" stack-label outlined readonly>
                    <template v-if="!readonly" v-slot:append>
                      <q-btn round icon="add" class="q-ma-xs" @click="onProduct()">
                      </q-btn>
                    </template>
                  </q-input>
                </div>
                <div class="bg-pink-1 q-mt-sm col-12" style="height:10px"></div>
                <div class="col-12">
                  <q-input v-model="data.qty" label="Quantity" class="q-ma-xs" stack-label outlined type="number"
                    @update:model-value="onQtyInput()" @focus="$event.target.select()" bg-color="yellow-1"
                    :input-class="data.qty < 0 ? 'text-red text-bold' : 'text-green text-bold'" :readonly="readonly" />
                </div>
                <div v-show="data.qty >= 0" class="col-12">
                  <q-input type="number" label="Cost (RM)" v-model="data.cost" class="q-ma-xs" stack-label outlined
                    @focus="$event.target.select()" bg-color="blue-1" input-class="text-blue text-bold"
                    :readonly="readonly" />
                </div>
                <div class="col-12">
                  <q-input v-model="data.ref_no" label="Ref No." class="q-ma-xs" stack-label outlined
                    :readonly="readonly" />
                </div>
                <div class="col-12">
                  <q-select class="q-ma-xs" label="Reason" :readonly="readonly" outlined stack-label v-model="data.reason"
                    :options="optReason">
                  </q-select>
                </div>
                <div class="col-12">
                  <q-input v-model="data.remark" label="Remark" class="q-ma-xs" stack-label outlined :readonly="readonly"
                    type="textarea" autogrow />
                </div>
                <div class="bg-pink-1 q-mt-sm col-12" style="height:20px"></div>
              </div>
            </q-expansion-item>
          </q-page>
        </q-page-container>
      </q-layout>

    </q-dialog>
  </div>
</template>

<script>
import SelectProduct from "../../components/common/SelectProductForm.vue"
import {
  gen
} from "../../gf/Gen.js"

import {
  val
} from "../../gf/Val.js"

import {
  mxData
} from "./AdjustmentFormData";
import {
  mxMet
} from "./AdjustmentFormMet";
import {
  useStore
} from 'stores/basic'
import {
  mapState
} from 'pinia'

export default {
  mixins: [gen, val, mxData, mxMet],
  computed: {
    ...mapState(useStore, ['objEvent', 'objSettings', 'objDefault', 'objPermission']),
  },
  components: {
    SelectProduct,
  },

};

</script>
