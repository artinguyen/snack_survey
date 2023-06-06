import { defineStore } from 'pinia'

interface IState {
  loading: boolean
}

const initState: IState = {
  loading: false
}

export const useCommonStore = defineStore('common', {
  state: () => {
    return { ...initState }
  },
  actions: {
    setLoading(status: boolean) {
      this.loading = status
    }
  }
})
