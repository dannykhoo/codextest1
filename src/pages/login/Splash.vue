<template>
  <div class="body text-white">
    <div class="wrapper">
      <div class="circ1"></div>
      <div class="circ2"></div>
      <h1 class="moon">Cool POS</h1>
      <p class="detail">Do More With Less</p>
    </div>
  </div>
</template>

<script>
import db from "../../gf/Dexie.js"
import {
  useStore
} from 'stores/basic'
import {
  mapState
} from 'pinia'
import {
  gen
} from "../../gf/Gen.js"

export default {
  name: 'SplashScreen',
  mixins: [gen],
  computed: {
    ...mapState(useStore, ['arUser', 'objDefaultUpdate', 'arImageSet', 'arImage', 'objEvent', 'objEventUpdate', 'objUser', 'arUserSet', 'objPermission',
      'objPermissionUpdate', 'objSettingsUpdate', 'objSettings', 'arTNCSet', 'objStoreSet', 'objStore', 'objStoreUpdate',
    ]),
  },
  mounted() {

    if (this.objEvent.token) {
      this.getBasicData()
    } else {
      this.$router.replace({
        path: '/login'
      })
    }
  },
  beforeCreate() {
    const meta = document.createElement('meta');
    meta.name = 'Cache-Control';
    meta.content = 'no-cache, no-store, must-revalidate';
    document.head.appendChild(meta);

    const pragma = document.createElement('meta');
    pragma.name = 'Pragma';
    pragma.content = 'no-cache';
    document.head.appendChild(pragma);

    const expires = document.createElement('meta');
    expires.name = 'Expires';
    expires.content = '0';
    document.head.appendChild(expires);
  },
  methods: {
    async getBasicData() {
      //Store device_code , camera id and etc..
      let arStorage = await db.objStore.toArray()

      if (arStorage.length > 0) {
        let objStore = arStorage[0]
        objStore.objTerminal = this.toObj(objStore.objTerminal)
        objStore.last_scanned = this.toObj(objStore.last_scanned)
        this.objStoreSet(objStore)
        if (this.objStore.auto_fullscreen == 1) {
          document.documentElement.requestFullscreen();
        }
        this.objDefaultUpdate({
          table: {
            height: objStore.default_table_height + "px",
            pagination: true,
            movableColumns: true,
            persistence: {
              sort: false,
              filter: false,
              group: false,
              page: false,
              columns: true,
            },
          }
        })
      } else {
        this.objStoreUpdateDexie()
      }
      //    if (this.objEvent.getBasicDataOnce) {
      let res = await this.conn("/user/get.php", {
        action: 'getBasicData',
      }, { no_loading: true })
      if (res.success) {
        this.objPermissionUpdate(res.objPermission)
        this.objSettingsUpdate(res.objSettings)
        // this.arUserSet(res.arUser)

        this.objEventUpdate({
          getBasicDataOnce: false
        })


        this.arImageSet(res.arImage)
        // console.log('arImage', res.arImage)
        this.arTNCSet(res.arTNC)

        this.arUserSet(res.arUser)

        setTimeout(() => {
          if (this.objPermission.access_main_page == 1) {
            this.$router.replace({
              path: '/'
            })
          } else {
            this.$router.replace({
              path: '/pos'
            })
          }
        }, 1500)

      } else {
        this.$router.replace({
          path: '/login'
        })
      }
      //   }
    },

  }
}

</script>

<style scoped>
.body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #6f5cba;
}

.wrapper {
  /* height: 70vmin;
    width: 70vmin; */
  height: 70vmin;
  width: 70vmin;
}

.circ1 {
  z-index: 2;
  position: absolute;
  margin-left: 18vmin;
  margin-top: 3vmin;
  height: 30vmin;
  width: 30vmin;
  border-radius: 100%;
  border: solid 4.5vmin rgba(255, 255, 255, 0.7);
  opacity: .005;
  -webkit-animation: puff-in-center 1s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
  animation: puff-in-center 1s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
}

.circ2 {
  z-index: 1;
  margin-top: 15vmin;
  margin-left: 10vmin;
  height: 30vmin;
  width: 30vmin;
  border-radius: 100%;
  background: #fda5f7;
  -webkit-animation: slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
  animation: slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}

h1.moon {
  text-align: center;
  font-size: 7vmin;
  letter-spacing: 1vmin;
  font-family: 'Nunito', sans-serif;
  -webkit-animation: tracking-in-expand .4s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
  animation: tracking-in-expand .4s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}

p.detail {
  position: relative;
  bottom: 4vmin;
  text-align: center;
  letter-spacing: 1vmin;
  font-size: 4vmin;
  font-family: 'Nunito', sans-serif;
  -webkit-animation: text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  animation: text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

/* keyframes */

@-webkit-keyframes puff-in-center {
  0% {
    -webkit-transform: scale(2);
    transform: scale(2);
    -webkit-filter: blur(4px);
    filter: blur(4px);
    opacity: 0;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

@keyframes puff-in-center {
  0% {
    -webkit-transform: scale(2);
    transform: scale(2);
    -webkit-filter: blur(4px);
    filter: blur(4px);
    opacity: 0;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

@-webkit-keyframes slide-in-blurred-top {
  0% {
    -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
    transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}

@keyframes slide-in-blurred-top {
  0% {
    -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
    transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}



@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }

  40% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}

@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }

  40% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}

@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }

  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }

  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
</style>
