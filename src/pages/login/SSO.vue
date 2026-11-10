<template>
  <loading-icon ref="loadingIcon"></loading-icon>
  <div class="bg">

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
        user_id: '',
        password: '',
        auto_login: false,

      },
      disable: false
    }
  },
  components: {
    LoadingIcon
  },
  computed: {
    ...mapState(useStore, ['objEvent', 'objEventUpdate', 'objUser', 'objUserUpdate', 'autoRenewToken', 'objCalendar', 'objCalendarSet']),
  },
  async created() {
    this.loadDexie()
    document.title = "Cool POS"
    console.log('query', this.$route.query)
    if (this.$route.query.jwt && this.$route.query.server) {

      this.objUserUpdate(this.toObj(this.$route.query.user))
      this.objEventUpdate({
        token: this.$route.query.jwt,
        server: this.$route.query.server,
      })

      this.autoRenewToken()
      setTimeout(() => {
        this.$router.replace({
          path: '/splash'
        })
      }, 0)


    } else {
      this.alertInfo("Login failed")
      this.$router.replace({
        path: '/login'
      })
    }


  },
  mounted() {
    this.$refs.loadingIcon.show()
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
  }
}

</script>

<style lang="scss" scoped>
@import "./style.css";
</style>
