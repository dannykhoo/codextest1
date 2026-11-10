import {
  Loading,
  QSpinnerHourglass,
  QSpinnerBall,
  date,
  uid
} from 'quasar'

import {
  useStore
} from 'stores/basic'
import {
  mapState
} from 'pinia'
export const gen = {
  computed: {
    ...mapState(useStore, ['objUser', 'objEvent', 'objSettings', 'arImage', 'objStore', 'objStoreSet', 'objEventUpdate']),
  },
  methods: {
    getDate(payload, type) {
      if (!payload) {
        payload = {
          month: 0,
          day: 0,
          minutes: 0,
          year: 0
        }
      }
      if (!type) {
        type = 'date'
      }
      let newDate = new Date()
      if (payload) {
        if (payload.day) {
          newDate = date.addToDate(newDate, {
            days: payload.day,
          })
        } else if (payload.month) {
          newDate = date.addToDate(newDate, {
            month: payload.month
          })
        } else if (payload.minutes) {
          newDate = date.addToDate(newDate, {
            minutes: payload.minutes
          })
        } else if (payload.year) {
          newDate = date.addToDate(newDate, {
            year: payload.year
          })
        }
      }
      if (type == 'date') {
        return date.formatDate(newDate, 'YYYY-MM-DD')
      } else if (type == 'datetime') {
        return date.formatDate(newDate, 'YYYY-MM-DD HH:mm:ss')
      } else if (type == 'time') {
        return date.formatDate(newDate, 'HH:mm')
      } else if (type == 'time2') {
        return date.formatDate(newDate, 'HH:mm A')
      } else if (type == 'year') {
        return date.formatDate(newDate, 'YYYY')
      } else if (type == 'zerominute') {
        return date.formatDate(newDate, 'YYYY-MM-DD HH:00')
      } else if (type == 'yearfirstday') {
        return date.formatDate(newDate, 'YYYY-01-01')
      } else if (type == 'yearendday') {
        return date.formatDate(newDate, 'YYYY-12-31')
      } else if (type == 'monthfirstday') {
        return date.formatDate(newDate, 'YYYY-MM-01')
      } else if (type == 'monthendday') {
        let day = date.formatDate(newDate, 'YYYY-MM-01')
        let nextMonth = date.addToDate(day, {
          month: 1
        })
        let result = date.addToDate(nextMonth, {
          day: -1
        })
        return date.formatDate(result, 'YYYY-MM-DD')
      } else if (type == 'timestamp') {
        return date.formatDate(Date.now(), 'YYYYMMDDHHmmssSSS')
      } else if (type == 'monthname') {
        return date.formatDate(Date.now(), 'MMM')
      } else if (type == 'monthnameyear') {
        return date.formatDate(Date.now(), 'MMM YYYY')
      } else if (type == 'clockdate') {
        return date.formatDate(Date.now(), 'dddd, D MMM')
      } else if (type == 'clocktime') {
        return date.formatDate(Date.now(), 'h:mmA')
      } else if (type == 'promotime') {
        return date.formatDate(Date.now(), 'HH:mm:00')
      }
    },
    getUID() {
      return new Date().getTime()
      //  return uid()
    },
    getUID2() {
      //return new Date().getTime()
      return uid()
    },
    alertInfo(data) {
      this.$q.notify({
        group: false,
        message: data,
        color: 'info',
        icon: 'error',
        timeout: 2000,
        position: 'top',
      })
    },
    alertWarning(data) {
      this.$q.notify({
        group: false,
        message: data,
        color: 'deep-orange',
        icon: 'report',
        timeout: 2000,
        position: 'top',
      })
    },

    alertSuccess(data) {
      this.$q.notify({
        group: false,
        message: data,
        color: 'green',
        icon: 'mood',
        timeout: 2000,
        position: 'top',
      })
    },
    alertError(data) {
      this.$q.notify({
        group: false,
        message: data,
        color: 'red',
        icon: 'error',
        timeout: 2000,
        position: 'top',
        html: true
      })
    },
    alertReminder(data) {
      this.$q.notify({
        group: false,
        message: 'Event Reminder',
        caption: data,
        color: 'indigo',
        icon: 'campaign',
        timeout: 60000,
        multiLine: true,
        position: 'bottom-right',
        actions: [{
          icon: 'clear',
          label: '',
          color: 'white',
          handler: () => {
            /* ... */
          }
        }]
      })
    },
    loadingShow() {
      Loading.show({
        spinner: QSpinnerHourglass,
        message: 'Please wait...',
        messageColor: 'white',
        spinnerSize: 120,
        spinnerColor: 'white',
      })
    },
    loadingShowC(message) {
      Loading.show({
        spinner: QSpinnerHourglass,
        message: message,
        messageColor: 'white',
        spinnerSize: 120,
        spinnerColor: 'white',
      })
    },
    loadingHide() {
      Loading.hide()
    },
    loading2Show() {
      Loading.show({
        spinner: QSpinnerBall,
        message: 'Please wait...',
        messageColor: 'white',
        spinnerSize: 200,
        spinnerColor: 'white',
      })
    },

    vDecimal(payload) {
      if (!/^[0-9.]*$/.test(payload) || payload.indexOf('.') > -1 && payload.match(/\./g).length > 1) {
        return false
      }
      return true
    },
    vDecimal2(payload) {
      if (payload == null || payload == '') {
        return true
      } else if (!/^[0-9.]*$/.test(payload) || payload.indexOf('.') > -1 && payload.match(/\./g).length > 1) {
        return false
      }
      return true
    },
    vInt(payload) {
      if (!/^[0-9]*$/.test(payload)) {
        return false
      }
      return true
    },
    vInt2(payload) {
      if (payload == null || payload == '') {
        return true
      } else if (!/^[0-9]*$/.test(payload)) {
        return false
      }
      return true
    },
    vChar(payload) {
      if (!/^[a-zA-Z0-9!@#$%\^&*+=._-]*$/.test(payload)) {
        // this.alertError('Invalid special characters found')
        return false
      }
      return true
    },
    vChar2(payload) {
      if (payload == null || payload == '') {
        return true
      } else if (!/^[a-zA-Z0-9!@#$%\^&*+=._-]*$/.test(payload)) {
        // this.alertError('Invalid special characters found')
        return false
      }
      return true
    },
    vDate(payload) {
      if (!/^[0-9-]*$/.test(payload) || payload.indexOf('-') < 0 || payload.match(/-/g).length != 2) {
        // this.alertError('Invalid special characters found')
        return false
      }
      return true
    },
    vDate2(payload) {
      if (payload == null || payload == '') {
        return true
      } else if (!/^[0-9-]*$/.test(payload) || payload.indexOf('-') < 0 || payload.match(/-/g).length != 2) {
        // this.alertError('Invalid special characters found')
        return false
      }
      return true
    },
    vEmail(payload) {
      let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      return reg.test(payload)
    },
    cDecimal(payload) {
      let value = parseFloat(payload)
      if ((undefined === value) || (null === value || isNaN(value) || value == 'Infinity' || value == "-Infinity")) {
        return 0
      }
      return Number(value)

    },
    cMoney(num) {
      if (num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
      } else {
        return 0.00
      }
    },
    cMoney2(num) {
      if (num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
      } else {
        return ''
      }
    },
    cInt(payload) {
      let value = parseInt(payload)
      if ((undefined === value) || (null === value || isNaN(value) || value == 'Infinity' || value == "-Infinity")) {
        return 0
      }
      return Number(value)
    },

    exportCSV(table, filename) {
      if (!filename) {
        filename = "data.csv"
      } else {
        filename = filename + ".csv"
      }
      if (table.getRows().length > 0) {
        // table.download("csv", filename, {
        //   delimiter: ",",
        //   downloadRowRange: "active",
        // });
        table.download("xlsx", filename + ".xlsx", {
          delimiter: ",",
          downloadConfig: {
            columnGroups: true, //include column groups in column headers for download
            rowGroups: true, //do not include row groups in download
            columnCalcs: true, //do not include column calculation rows in download
          },
        }, "active");
      } else {
        this.alertError("Cannot export empty list");
      }
    },
    exportExcel(table, filename) {
      table.download("xlsx", filename + ".xlsx", {
        delimiter: ",",
        downloadConfig: {
          columnGroups: true, //include column groups in column headers for download
          rowGroups: true, //do not include row groups in download
          columnCalcs: true, //do not include column calculation rows in download
        },
      }, "active");
    },

    groupBy(array, key) {
      const result = {}
      array.forEach(item => {
        if (!result[item[key]]) {
          result[item[key]] = []
        }
        result[item[key]].push(item)
      })
      return result
    },
    getDistinct(arData, field) {
      const uniqueArr = [...new Set(arData.map(data => data[field]))]
      return uniqueArr
    },
    getTimezone() {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timezone
    },
    getOffset() {
      //timesonze offset , +8 for malaysia
      function convertToOffsetFormat(number) {
        var sign = (number >= 0) ? '+' : '-';
        var hours = Math.floor(Math.abs(number));
        var minutes = Math.floor((Math.abs(number) % 1) * 60);

        return sign + padZero(hours) + ':' + padZero(minutes);
      }

      function padZero(number) {
        return (number < 10) ? '0' + number : number;
      }

      var d = new Date();
      var n = d.getTimezoneOffset();
      let offset = -(n / 60)

      let result = convertToOffsetFormat(offset);

      return result
    },
    vString(payload) {
      if (!payload || payload == 'undefined' || payload == 'NAN') {
        return ''
      } else {
        return payload
      }
    },
    monthName(month) {
      // console.log("monthName", month)
      if (month == '01') {
        return 'January'
      } else if (month == '02' || month == 2) {
        return 'February'
      } else if (month == '03' || month == 3) {
        return 'March'
      } else if (month == '04' || month == 4) {
        return 'Aprial'
      } else if (month == '05' || month == 5) {
        return 'May'
      } else if (month == '06' || month == 6) {
        return 'June'
      } else if (month == '07' || month == 7) {
        return 'July'
      } else if (month == '08' || month == 8) {
        return 'August'
      } else if (month == '09' || month == 9) {
        return 'September'
      } else if (month == '10' || month == 10) {
        return 'October'
      } else if (month == '11' || month == 11) {
        return 'November'
      } else if (month == '12' || month == 12) {
        return 'December'
      } else {
        return 'NA'
      }
    },
    monthName2(month) {
      // console.log("monthName", month)
      if (month == '01') {
        return 'Jan'
      } else if (month == '02' || month == 2) {
        return 'Feb'
      } else if (month == '03' || month == 3) {
        return 'Mar'
      } else if (month == '04' || month == 4) {
        return 'Apr'
      } else if (month == '05' || month == 5) {
        return 'May'
      } else if (month == '06' || month == 6) {
        return 'Jun'
      } else if (month == '07' || month == 7) {
        return 'Jul'
      } else if (month == '08' || month == 8) {
        return 'Aug'
      } else if (month == '09' || month == 9) {
        return 'Sep'
      } else if (month == '10' || month == 10) {
        return 'Oct'
      } else if (month == '11' || month == 11) {
        return 'Nov'
      } else if (month == '12' || month == 12) {
        return 'Dec'
      } else {
        return 'NA'
      }
    },
    getSize(payload) {
      const byteSize = new Blob([payload]).size
      console.log('Size', byteSize)
      return byteSize
    },
    getTimestamp() {
      return date.formatDate(Date.now(), 'YYYYMMDDHHmmssSSS')
    },
    conn(path, data, option) {
      let vm = this
      if (option) {
        if (option.no_loading) {
          option.loading = true
        } else {
          option.loading = false
        }

        if (option.no_token) {
          option.no_token = true
        } else {
          option.no_token = false
        }


      } else {
        option = {
          no_loading: false,
          no_token: false,
          use_accountserver: false
        }
      }
      if (option.no_token) {

      } else {
        data.token = vm.objEvent.token
      }

      data.local_date = vm.getDate(null, 'datetime')


      return new Promise((resolve, reject) => {
        if (option.no_loading) {

        } else {
          vm.loadingShow()
        }
        vm.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          url: vm.objEvent.server + path,
          data: data,
          timeout: 60000
        }).then(res => {

          vm.loadingHide()
          if (typeof (res) == "undefined") {
            resolve(null)
            vm.alertError('Connection error')
            return
          }
          if (res.data.success) {
            resolve(res.data)
          } else {
            resolve(res.data)
            if (res.data) {
              vm.alertError(res.data)
            } else {
              vm.alertError('Connection error')
            }

          }
        }).catch(function (error) {

          resolve('test')
          vm.loadingHide()
          if (error) {
            vm.alertError(error)
          } else {
            vm.alertError('Connection error')
          }
          reject()
        })
      })
    },
    connUpload(path, data, file) {
      let vm = this
      console.log('data', data)

      let formData = new FormData();
      formData.append('file', file)
      formData.append('token', vm.objEvent.token)
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          console.log(key + " -> " + data[key]);
          //    console.log('data', data[key])
          formData.append(key, data[key])
        }
      }


      return new Promise((resolve, reject) => {
        vm.loadingShow()
        vm.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          url: vm.objEvent.server + path,
          data: formData,
          timeout: 60000
        }).then(res => {
          vm.loadingHide()
          if (typeof (res) == "undefined") {
            console.log('undefinedt lar')
            vm.alertError('Connection error')
            return
          }
          if (res.data.success) {
            resolve(res.data)
          } else {
            if (res.data) {
              vm.alertError(res.data)
            } else {
              vm.alertError('Connection error')
            }
            resolve(res.data)
          }
        }).catch(function (error) {
          vm.loadingHide()
          if (error) {
            vm.alertError(error)
          } else {
            vm.alertError('Connection error')
          }
          reject()
        })
      })
    },
    confirmation(message, title) {
      let vm = this
      let defaultTitle = 'Confirmation'
      let defaultMessage = 'Do you want to continue this action?'
      if (title) {
        defaultTitle = title
      }
      if (message) {
        defaultMessage = message
      }
      return new Promise((resolve, reject) => {
        vm.$q
          .dialog({
            title: defaultTitle,
            message: defaultMessage,
            ok: 'Yes',
            cancel: 'Cancel'
          })
          .onOk(() => {
            resolve(true)
          }).onCancel(() => {
            resolve(false)
          }).onDismiss(() => {
            resolve(false)
          })
      })
    },
    confirmationInput(message, title, input) {
      let vm = this
      let defaultTitle = ''
      let defaultMessage = ''
      if (title) {
        defaultTitle = title
      }
      if (message) {
        defaultMessage = message
      }
      return new Promise((resolve, reject) => {
        vm.$q
          .dialog({
            title: defaultTitle,
            message: defaultMessage,
            ok: 'Confirm',
            cancel: 'Cancel',
            prompt: {
              model: input,
              type: 'text' // optional
            },
          })
          .onOk((data) => {
            resolve(data)
          }).onCancel(() => {
            resolve(false)
          }).onDismiss(() => {
            resolve(false)
          })
      })
    },
    iconSelect() {
      // console.log('aaa')
      return "<i class='far fa-hand-point-left fa-lg'></i>";
    },
    vDigitOnly(payload) {
      return /^\d+$/.test(payload)
    },

    async objStoreUpdateDexie() {
      //   console.log('objStoreUpdateDexie', this.objStore)
      let objStore = JSON.parse(JSON.stringify(this.objStore))
      //DExie cannot store object in object, need to stringify
      objStore.objTerminal = JSON.stringify(objStore.objTerminal)
      objStore.last_scanned = JSON.stringify(objStore.last_scanned)
      await db.objStore.clear()
      await db.objStore.add({
        ...objStore
      })
    },


    deleteConfirmation() {
      let vm = this
      return new Promise(async (resolve, reject) => {
        await vm.$q.dialog({
          title: 'Are you sure to delete this record? Deleted records are not recoverable',
          message: "Please enter 'confirm' to proceed with the deletion.",
          prompt: {
            model: '',
            type: 'text' // optional
          },
          cancel: true,
        }).onOk((data) => {
          if (data && data.toUpperCase() == 'CONFIRM') {
            resolve(true)
          } else {
            this.alertInfo("Please enter 'Confirm' to proceed")
            // vm.deleteConfirmation()
          }
        }).onCancel(() => {
          resolve(false)
        }).onDismiss(() => {
          resolve(false)
        })
      })
    },
    inputConfirmation(title, message) {
      if (!message) {
        message = "Please enter 'confirm' to proceed with the action."
      }
      let vm = this
      return new Promise(async (resolve, reject) => {
        await vm.$q.dialog({
          title: title,
          message: message,
          prompt: {
            model: '',
            type: 'text' // optional
          },
          cancel: true,
        }).onOk((data) => {
          if (data && data.toUpperCase() == 'CONFIRM') {
            resolve(true)
          } else {
            this.alertInfo("You didn't enter 'Confirm' correctly.")
          }
        }).onCancel(() => {
          resolve(false)
        }).onDismiss(() => {
          resolve(false)
        })
      })
    },
    inputDialog(title = "", message = "") {
      let vm = this
      return new Promise(async (resolve, reject) => {
        await vm.$q.dialog({
          title: title,
          message: message,
          prompt: {
            model: '',
            type: 'text' // optional
          },
          cancel: false,
        }).onOk((data) => {
          if (data) {
            resolve(data)
          } else {
            vm.alertInfo("Required field cannot be left blank")
            vm.inputDialog()
          }
        }).onCancel(() => {
          resolve(false)
        }).onDismiss(() => {
          resolve(false)
        })
      })
    },


    toObj(payload) {
      if (payload && payload != "" && payload != "null" && payload != "undefined" && typeof (payload) == "string") {
        return JSON.parse(payload)
      } else if (payload && payload != "" && typeof (payload) == "object") {
        return payload
      } else {
        return {}
      }
    },
    toArray(payload) {
      if (payload && payload != "" && payload != "null" && payload != "undefined" && typeof (payload) == "string") {
        return JSON.parse(payload)
      } else if (payload && payload != "" && typeof (payload) == "object") {
        return payload
      } else {
        return []
      }
    },
    toStringify(payload) {
      if (payload && payload != "") {
        return JSON.stringify(payload)
      } else {
        return ""
      }
    },
    countDecimals(payload) {
      if (Math.floor(payload) !== payload)
        return payload.toString().split(".")[1].length || 0;
      return 0;
    },
    toQty(payload, decimal_places = 0) {
      if (payload && !isNaN(parseFloat(payload)) && isFinite(payload)) {
        return Number(payload).toFixed(decimal_places)
      } else {
        let zero = 0
        return zero.toFixed(decimal_places)
      }
    },
    toCost(payload) {
      if (payload && !isNaN(parseFloat(payload)) && isFinite(payload)) {
        return Number(payload).toFixed(this.objSettings.rounding_cost)
      } else {
        let zero = 0
        return zero.toFixed(this.objSettings.rounding_cost)
      }
    },
    toPrice(payload) {
      let decimal_places = this.objSettings.rounding_price
      let value = parseFloat(payload)
      if ((undefined === value) || (null === value || isNaN(value)) || value == 0 || value == 'Infinity' || value == "-Infinity") {
        return (0).toFixed(decimal_places)
      } else {
        return value.toFixed(decimal_places)
      }
    },

    OpenWindowPost(url, windowoption, name, params) {
      var form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", url);
      form.setAttribute("target", name);
      for (var i in params) {
        if (params.hasOwnProperty(i)) {
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = i;
          input.value = params[i];
          form.appendChild(input);
        }
      }
      document.body.appendChild(form);
      //note I am using a post.htm page since I did not want to make double request to the page
      //it might have some Page_Load call which might screw things up.
      window.open("post.htm", name, windowoption);
      form.submit();
      document.body.removeChild(form);
    },
    getReceiptLogo() {
      let imageIndex = this.arImage.findIndex(z => z.module == "receipt logo")
      if (imageIndex > -1) {
        return this.arImage[imageIndex].image_base64
      } else {
        return null
      }
    },
    getReceiptFooter() {
      let imageIndex = this.arImage.findIndex(z => z.module == "receipt footer")
      if (imageIndex > -1) {
        return this.arImage[imageIndex].image_base64
      } else {
        return null
      }
    },
    getGeneralLogo() {
      let imageIndex = this.arImage.findIndex(z => z.module == "general logo")
      if (imageIndex > -1) {
        return this.arImage[imageIndex].image_base64
      } else {
        return null
      }
    },
    getGeneralFooter() {
      let imageIndex = this.arImage.findIndex(z => z.module == "general footer")
      if (imageIndex > -1) {
        return this.arImage[imageIndex].image_base64
      } else {
        return null
      }
    },
    convertCalendarDateOnly(payload, minutes) {
      payload = date.addToDate(payload, {
        minutes: minutes,
        // month: 1
      })
      return date.formatDate(payload, 'YYYY-MM-DD')
    },
    convertCalendarDate(payload, minutes) {
      payload = date.addToDate(payload, {
        minutes: minutes,
        // month: 1
      })
      return date.formatDate(payload, 'YYYY-MM-DD HH:00')
    },
    convertCalendarDateTime(payload, minutes) {
      payload = date.addToDate(payload, {
        minutes: minutes,
        // month: 1
      })
      return date.formatDate(payload, 'YYYY-MM-DD HH:mm')
    },
    getCalendarTime(minutes) {
      let newDate = Date.now()
      newDate = date.addToDate(newDate, {
        minutes: minutes,
        // month: 1
      })
      // return date.formatDate(newDate, 'YYYY-MM-DD HH:mm:ss')
      return date.formatDate(newDate, 'YYYY-MM-DD HH:00')
    },
    addDateDay(days) {
      let dateNow = Date.now()
      let newDate = date.addToDate(dateNow, { days: days })
      return date.formatDate(newDate, 'YYYY-MM-DD')
    },
    removeSymbol(payload) {
      var regex = /[^a-zA-Z0-9]/g;
      var resultString = payload.replace(regex, '');
      return resultString;
    },
    setColumnResizeable(table) {
      //tabulator

      var columns = table.getColumnDefinitions()
      console.log('columns', columns)
      columns.forEach(z => {
        z.resizable = this.objStore.column_resizeable
        //  z.movableColumns = this.objStore.objDefault.table.movableColumns
      })

      table.setColumns(columns);
    },
    isPortrait() {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      return portrait
    },
    toBase64(file) {
      //Can convert PDF file, tested,  just upload file 'accept' must include pdf format
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    },
    offWakelock() {
      console.log('turnOffWakelock')
      this.objEvent.wakeLock.release()
      this.objEventUpdate({
        wakeLock: null
      })
    },
    async onWakelock() {
      if (this.objEvent.wakeLock) {
        console.log('wakelock already activated')
        return
      }
      if ('wakeLock' in navigator) {
        console.log('wakelock supported')
        const requestWakeLock = async () => {
          try {
            this.objEventUpdate({
              wakeLock: await navigator.wakeLock.request('screen')
            })
            // this.wakeLock.addEventListener('release', () => {
            //   console.log('Screen Wake Lock was released');
            // })
            console.log('Wakelock turn on')
          } catch (err) {
            console.log('Wakelock error')
          }
        }
        await requestWakeLock()
      } else {
        console.log('Wakelock not suppoerted')
      }
    },

    detectOrientation() {
      if (window.innerWidth > window.innerHeight) {
        return 'Landscape'
      } else {
        return 'Portrait'
        console.log('Portrait mode');
      }
    },
    highlightText(event) {
      event.preventDefault()
      event.target.select()
    },
    blurAll() {
      let inputs = document.querySelectorAll('input[type="text"]');
      inputs.forEach(input => {
        input.blur();
      })
      let buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.blur();
      })
    },
    isNumeric(input) {
      return /^\d+$/.test(input);
    }
  }
}
