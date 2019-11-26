import { auth } from "../firebaseSetup";

export default function ({ app, redirect }) {
    app.router.beforeEach((to, from, next) => {
        let token;
        auth.currentUser.getIdTokenResult()
            .then((token) => {
                token = token;
            })
            .catch((error) => {
                console.error(error);
                next();
            });
        // console.log(to);
        if(!token) {
            return redirect("/login")
        }
        else {
            console.log(to.path);
            console.log("hit");
            next();
        }
    })
}
