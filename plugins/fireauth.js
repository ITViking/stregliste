import { auth } from "../firebaseSetup";

export default context => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(token => {
      if (!token) {
        return reject("no user");
      }


      let user = {
        displayName: token.displayName,
        isAdmin: false,
        email: token.email
      };

      token.getIdTokenResult()
        .then(result => {
          user.isAdmin = result.claims.admin;
        })
        .catch(error => {
          console.info("didn't succeed in getting admin claims: ", error);
        });

      return resolve(store.commit('setUser', user));
    });
  });
};
