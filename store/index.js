import create from 'zustand'

export const useStore = create(set => (
  {
    isLogin: false,
    setIsLogin: () => set(state => ({isLogin: true}))
  },
  {
    userData: '',
    setUserData: () => set(state => ({ userData: state}))
  }
))