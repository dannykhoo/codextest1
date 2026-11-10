<template>
  <q-file v-model="file" id="file" ref="file" :label="title" outlined @update:model-value="onSubmitFile()" :filter="checkFile"
    dense />
</template>
<script>
  import {
    gen
  } from "../../gf/Gen.js"
  import axios from "axios";
  export default {
    mixins: [gen],
    props: ['refno', 'module', 'status', 'title'],
    data() {
      return {
        file: null,
        filterPass: false,
      };
    },
    methods: {
      onUpload() {
        this.$refs.file.pickFiles()
      },
      checkFile(data) {
        console.log('checkFile', data)
        if (data.length > 0) {
          if (data[0].size > 1000000) { //mb
            this.alertInfo('Exceed size limit')
            this.filterPass = false
            return;
          }
        } else {
          this.filterPass = false
          return;
        }
        this.filterPass = true
        return data
      },
      onSubmitFile() {
        let vm = this
        if (!this.filterPass) {
          return
        }
        this.$axios.defaults.headers.common['Content-type'] = `application/x-www-form-urlencoded; charset=UTF-8`;
        delete axios.defaults.headers.common['Content-type'];
        let formData = new FormData();
        formData.append('file', this.file)
        formData.append('Token', this.objEvent.Token)
        formData.append('RefNo', this.refno)
        formData.append('Module', this.module)
        formData.append('Status', this.status)
        this.$axios.post(this.objMain.server + '/uploads/uploader.php',
            formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          ).then(function (res) {
            vm.$axios.defaults.headers.common['Content-type'] = `application/x-www-form-urlencoded; charset=UTF-8`;
            vm.file = null
            if (res.data.success) {
              console.log('filename', res.data.Filename)
              vm.$emit('done', {
                Filename: res.data.Filename,
                Extension: res.data.Extension,
                LastID: res.data.LastID
              })
            }
          })
          .catch(function (res) {
            vm.file = null
            vm.$axios.defaults.headers.common['Content-type'] = `application/x-www-form-urlencoded; charset=UTF-8`;

          });

      },
    },
  }

</script>
