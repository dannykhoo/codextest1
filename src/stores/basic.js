import {
  defineStore
} from 'pinia';
import axios from "axios";
export const useStore = defineStore('basic', {
  state: () => ({
    objUser: {
      user_id: '',
      store_id: '',
      name: 'danny',
    },
    objEvent: {
      server: 'http://localhost/coolpos_php',

    },
    objStore: {
      dexie_uid: 0,


    },
    objDefault: {

    },
    objPermission: {

    },
    objSettings: {

    },


  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    objUserUpdate(payload) {
      this.objUser = {
        ...this.objUser,
        ...payload
      };
    },
    objEventUpdate(payload) {
      this.objEvent = {
        ...this.objEvent,
        ...payload
      };
    },
    objPermissionUpdate(payload) {
      this.objPermission = {
        ...this.objPermission,
        ...payload
      };
    },
    objDefaultUpdate(payload) {
      this.objDefault = {
        ...this.objDefault,
        ...payload
      };
    },
    objSettingsUpdate(payload) {
      this.objSettings = {
        ...this.objSettings,
        ...payload
      };
    },


    objStoreUpdate(payload) {
      this.objStore = {
        ...this.objStore,
        ...payload
      };
    },
    objStoreSet(payload) {
      this.objStore = payload
    },
    arSyncUpdate(payload) {
      this.arSync = {
        ...this.arSync,
        ...payload
      };
    },
    arSyncSet(payload) {
      this.arSync = payload
    },
    arCustomerSet(payload) {
      this.arCustomer = payload
    },
    arProductSet(payload) {
      this.arProduct = payload
    },
    arSerializedSet(payload) {
      this.arSerialized = payload
    },
    arImageSet(payload) {
      this.arImage = payload
    },
    arUserSet(payload) {
      this.arUser = payload
    },
    arTNCSet(payload) {
      this.arTNC = payload
    },
    objCalendarSet(payload) {
      this.objCalendar = payload
    },
    objCalendarUpdate(payload) {
      this.objCalendar = {
        ...this.objCalendar,
        ...payload
      };
    },
    autoRenewToken() {
      setInterval(() => {
        console.log('renew token')
        axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          url: this.objEvent.server + "/includes/renewtoken.php",
          data: {
            token: this.objEvent.token
          },
          timeout: 60000
        }).then(res => {
          if (res.data.success) {
            console.log('renew token successfully', res.data.jwt)
            this.objEvent.token = res.data.jwt
            // console.log('renewed', state.objEvent.token)
          }
        })
        // }, (60000) - 10000); //1minutes - 10seconds
      }, (60000 * 60 * 12) - 60000); //60minutes - 1minute   X12 = 12HOURS
    }
  },
});
