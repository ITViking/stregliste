export default function ({ store, redirect, route }) {
    if (!store.getters["user/isSignedIn"]) {
        console.log("is user signed in: ", store.getters["user/isSignedIn"]);
        console.log("user in store: ", store.getters["user/get"]);
        return redirect("/");
    }
    console.log("user in store: ", store.getters["user/get"]);

    console.log("is user signed in: ", store.getters["user/isSignedIn"]);
    return;
};
