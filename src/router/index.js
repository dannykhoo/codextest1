import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import {
  storeToRefs
} from 'pinia'
import {
  useStore
} from 'stores/basic'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })


  Router.beforeEach((to, from, next) => {
    const store = useStore()
    const {
      objPermission,
      objEvent
    } = storeToRefs(store);
    if (to.path != "/login" && to.path != "/splash" && to.path != "/") {
      //  console.log('ada token',objEvent.value.token)
      //   console.log('objPermission.access_main_page', objPermission)
      if (objEvent.value.token) {
        if (to.path != '/pos' && objPermission.value.access_main_page == 0) {
          next({
            path: "/login"
          });
        } else {
          next()
        }

      } else {
        next({
          path: "/login"
        });
      }

      // if (to.path === '/home') {
      //   store.dispatch('toHomePath', true)
      // } else {

      // }
      // if (store.getters.objEvent.Token) {
      //   next()
      // } else {
      //   next({
      //     path: "/login"
      //   });
      // }
      //next()
    } else {
      next();
    }
  })

  return Router
})


