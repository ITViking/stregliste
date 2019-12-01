export default function ({ store, redirect, route }) {
    if (!store.getters["user/isSignedIn"]) {
        return redirect("/");
    }

    return;
};
