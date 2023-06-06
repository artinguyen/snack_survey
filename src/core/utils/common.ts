import { storeToRefs } from 'pinia'
import CryptoJS from 'crypto-js'

import app from '@/main'
import * as store from '@/stores'
import { ENV_CONFIG } from '../constants/app'

/**
 * Create instance router
 * Use in file *.ts. If want to use function "handleRouter" in *.vue => /hooks/commom.ts
 */
export const $router = {
  push(props: Record<string, any>, newTab = false) {
    if (!newTab) {
      app.config.globalProperties.$router.push({ ...props })
    } else {
      const newRoute = app.config.globalProperties.$router.resolve(props)
      window.open(newRoute.href)
    }
  },
  replace(props: Record<string, any>) {
    app.config.globalProperties.$router.replace({ ...props })
  },
  allConfig() {
    return app.config.globalProperties.$router
  }
}

/**
 * Create instance store
 * Use in file *.ts. If want to use function in *.vue => /hooks/commom.ts
 */
export const $store = {
  getStore(storeName: string) {
    const { [storeName]: targetStore } = store as Record<string, any>

    return targetStore
  },
  getter(storeName: string) {
    const useStore = this.getStore(storeName)
    const storeData = storeToRefs(useStore())

    return { ...storeData }
  },
  dispatch(storeName: string, fucDispatch: string, payload?: any) {
    const useStore = this.getStore(storeName)
    const { [fucDispatch]: action } = useStore()

    action(payload)
  }
}

// Check value is not exists
export const isNullOrEmpty = (value?: number | string | null): value is null | undefined => {
  return (value ?? '') === ''
}

/**
 * @param params object payload to call api
 * @param notRequired keys want not check empty or null
 * @returns If payload have value null/empty will return false => not access to call api
 */
export const validParams = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: { [key: string]: any },
  notRequired?: string[]
) => {
  if (params) {
    const objClone = { ...params }
    notRequired?.map((p) => {
      delete objClone[p]
    })
    const notOk = Object.values(objClone).some(
      (d) => (typeof d === 'number' && isNaN(d)) || isNullOrEmpty(d)
    )
    if (!notOk) {
      return true
    }
  }

  return false
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const removeDuplicates = <T = string | number>(arr: T[]) => {
  const s = new Set(arr)
  const it = s.values()

  return Array.from(it)
}

export const convertFileToBase64 = (file: File, callback: Function) => {
  const reader = new FileReader()
  reader.onload = () => {
    const _bs64 = reader.result
    callback(_bs64)
  }
  reader.onerror = () => {
    callback(null)
  }
  reader.readAsDataURL(file)
}

export const scrollToTop = () => {
  const target = document.documentElement.scrollTop || document.body.scrollTop
  if (target > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, target - target / 8)
  }
}

export const blockScroll = () => {
  const getId = document.getElementById('mdp') as HTMLElement
  getId.scrollTop = 0
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  getId.className += ' stop-scrolling'
}

export const getEncryptedCode = (data: string) => {
  const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(ENV_CONFIG.KEY_ENCRYP), {
    iv: CryptoJS.enc.Utf8.parse(ENV_CONFIG.IV_ENCRYP),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  })
  return cipher.toString()
}

export const getDecryptedData = (encryptedData: string) => {
  const cipher = CryptoJS.AES.decrypt(
    encryptedData,
    CryptoJS.enc.Utf8.parse(ENV_CONFIG.KEY_ENCRYP),
    {
      iv: CryptoJS.enc.Utf8.parse(ENV_CONFIG.IV_ENCRYP),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    }
  )
  return cipher.toString(CryptoJS.enc.Utf8)
}

export const getHashingMD5 = (message: string) => {
  const hash = CryptoJS.MD5(message, {})

  return hash.toString()
}
