import { auth } from "../firebaseSetup";

export default context => {
    console.log("hit plugin");
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        return resolve(store.commit('setUser', user))
      }
      return resolve()
    })
  })
}
