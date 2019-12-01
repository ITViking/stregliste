import { auth } from "../firebaseSetup";

export default async context => {
  const { store } = context;

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(token => {
      if (!token) {
        return resolve();
      }

      token.getIdTokenResult()
        .then(result => {

          let user = {
            displayName: token.displayName,
            email: token.email,
            isAdmin: result.claims.admin,
            isRoot: result.claims.root,
            signedIn: true,
          };

          store.commit('user/set', user);
        })
        .catch(error => {
          console.info("didn't succeed in getting admin claims: ", error);
        });

      return resolve();
    });
  });
};
