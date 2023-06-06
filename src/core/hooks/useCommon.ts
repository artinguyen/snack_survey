/**
 * Attentive: only use hook in file *.vue
 */

import { storeToRefs } from 'pinia'
import * as store from '@/stores'
import { useRoute, type RouteLocationNormalized, useRouter } from 'vue-router'

const useCommon = (initStoreName: string) => {
  /**
   * Start handle Common hook store
   * @param storeName
   * @returns
   */
  const getStore = (storeName?: string) => {
    const { [storeName ? storeName : initStoreName]: pinia } = store as Record<string, Function>

    return pinia
  }

  // Get store
  const storeGetters = (storeName?: string) => {
    const store = getStore(storeName)
    const storeData = storeToRefs(store())

    return { ...storeData }
  }

  // Store dispatch an action
  const storeDispatch = (fucDispatch: string, payload?: any, storeName?: string) => {
    const useStore = getStore(storeName)
    const { [fucDispatch]: action } = useStore()

    action(payload)
  }

  /**
   * Common router
   */
  const route = useRoute()
  const router = useRouter()

  const getRouter = (key: keyof RouteLocationNormalized) => {
    return route[key]
  }

  const getQuery = () => {
    return getRouter('query')
  }

  const getParams = () => {
    return getRouter('params')
  }

  const handleRouter = {
    // settingConfig: {query, param}
    pushPath: (path: string, settingConfig: object = {}, openNewTab = false) => {
      const config = {
        ...{ path },
        ...settingConfig
      }

      if (!openNewTab) {
        router.push({ ...config })
      } else {
        const newRoute = router.resolve(config)
        window.open(newRoute.href)
      }
    },
    replacePath: (path: string, settingConfig: object = {}) => {
      const config = {
        ...{ path },
        ...settingConfig
      }

      router.replace({ ...config })
    },
    pushName: (nameRouter: string, settingConfig: object, openNewTab = false) => {
      const config = {
        ...{ name: nameRouter },
        ...settingConfig
      }

      if (!openNewTab) {
        router.push({ ...config })
      } else {
        const newRoute = router.resolve(config)
        window.open(newRoute.href)
      }
    }
  }

  return {
    // Store
    storeGetters,
    storeDispatch,

    // Router
    getRouter,
    getQuery,
    getParams,
    handleRouter
  }
}

export default useCommon
