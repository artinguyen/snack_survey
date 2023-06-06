import { defineStore } from 'pinia'

interface IState {
  count: number
}

const initState: IState = {
  count: 0
}

export const useCounterStore = defineStore('counter', {
  state: (): IState => {
    return { ...initState }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
