<template>
  <loading-icon ref="loadingIcon"></loading-icon>
  <div class="bg">
    <div class="flex flex-center row">
      <div class="col-12" style="height:100px">

      </div>
      <q-card class="q-ma-xs" style="width:380px;border-left:#a071cb 15px solid">
        <q-card-section class="bg-c2 text-white ">
          <q-img src="~assets/logo.png" class="q-mx-sm" style="width:90px;height:95px;"></q-img>
          <span style="font-size:50px" class="font-2">Cool POS</span>
        </q-card-section>
        <q-card-section>
          <q-input :readonly="disable" outlined v-model.trim="data.email" label="Email" @keydown.enter="onSubmit()"
            stack-label class="q-ma-xs">
            <template v-slot:prepend>
              <q-icon name="account_circle" color="c1" />
            </template>
          </q-input>
          <q-input :readonly="disable" outlined v-model.trim="data.password" label="Password" @keydown.enter="onSubmit()"
            stack-label type="password" class="q-ma-xs">
            <template v-slot:prepend>
              <q-icon name="vpn_key" color="c1" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions class="row font1">
          <div class="col-6 text-left text-c1">
            <div class="cursor-pointer" @click="onForgotPassword()">Forgot Password</div>
          </div>
          <div class="col-6 text-right font-3">
            <q-btn :disable="disable" style="font-size:16px" color="c2" no-caps ripple label="Login"
              icon-right="arrow_forward_ios" @click="onSubmit()">
            </q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  useStore
} from 'stores/basic'
import {
  mapState
} from 'pinia'
import {
  gen
} from "../../gf/Gen.js"
import LoadingIcon from "../../components/common/Loading.vue"
import db from "../../gf/Dexie.js"

export default {
  name: 'Login',
  mixins: [gen],
  data() {
    return {
      data: {
        email: '',
        password: '',
        auto_login: false,

      },
      disable: false
    }
  },
  components: {
    LoadingIcon,

  },
  computed: {
    ...mapState(useStore, ['objEvent', 'objEventUpdate', 'objUser', 'objUserUpdate', 'autoRenewToken', 'objCalendar', 'objCalendarSet']),
  },
  async created() {
    document.title = "Cool POS"

    let objUser = await db.objUser.toArray()
    console.log('objUser', objUser)
    if (objUser.length > 0) {
      this.data.email = objUser[0].email
      this.data.password = this.decryptText(objUser[0].password)
      this.data.auto_login = objUser[0].auto_login
      //this.onSubmit()
    }



    // let objBasic = await db.arBasic.toArray()
    // if (objBasic.length == 0) {
    //   db.transaction('rw', db.arBasic, async () => {
    //     await db.arBasic.add({
    //       module: 'pos_terminal',
    //       default: 'POS Cashier 1',
    //     })
    //   })
    // }
  },
  mounted() {
    this.loadDexie()
  },
  methods: {
    async loadDexie() {
      let objCalendar = await db.calendar.toArray()
      if (objCalendar.length > 0) {
        objCalendar[0].selectedDate = this.getDate()
        this.objCalendarSet(objCalendar[0])
        // console.log('this.calendar from dexie', objCalendar[0])
        //  console.log('this.calendar from global', this.objCalendar)
      } else {
        await db.calendar.clear()
        await db.calendar.add(JSON.parse(JSON.stringify(this.objCalendar)))
      }


    },
    onForgotPassword() {
      window.open(`https://nextkii.com/home/#/forgotpassword`);
    },
    async onSubmit() {
      // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)




      if (!this.data.email || !this.data.password) {
        this.alertInfo("Please fill in required fields");
        return;
      }
      if (!this.data.auto_login) {
        db.objUser.clear()
      }

      this.disable = true
      this.$refs.loadingIcon.show()
      let res = await this.conn("/user/login.php", {
        action: 'login',
        email: this.data.email,
        password: this.data.password,
        // tz: this.getOffset()
      }, {
        use_accountserver: true,
        no_token: true,
        no_loading: true
      })
      this.disable = false
      this.$refs.loadingIcon.hide()
      if (res.success) {
        this.objUserUpdate(res.user)
        this.objEventUpdate({
          token: res.jwt,
          server: res.server
        })
        if (this.data.auto_login) {
          db.transaction('rw', db.objUser, async () => {
            await db.objUser.clear();
            await db.objUser.add({
              user_id: res.user.user_id,
              email: res.user.email,
              password: this.encryptText(res.user.password),
              auto_login: this.data.auto_login
            })
          })

        } else {
          db.transaction('rw', db.objUser, async () => {
            await db.objUser.clear();
          })
        }
        this.autoRenewToken()
        this.$router.replace({
          path: '/splash'
        })

        // this.$router.replace({
        //   path: '/'
        // })

        // this.$router.replace({
        //   path: '/peerjstest'
        // })
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./style.css";

// .bg {
//   background-image: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("~assets/bgbook.jpg");
//   background-repeat: repeat;
//   z-index: -1;
//   height: 100vh;
// }
</style>
