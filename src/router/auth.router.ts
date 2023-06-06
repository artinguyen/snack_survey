import type { Router } from 'vue-router'

const checkAuth = (router: Router) => {
  router.beforeEach((to, from, next) => {
    next()
  })

  router.afterEach((to, from) => {
    // TODO: do something
  })
}

export default checkAuth
