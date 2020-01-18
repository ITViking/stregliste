export default function ({ store, redirect, route }) {
    if (!store.getters["user/isAdmin"]) {
        return redirect("/tap");
    }

    return;
};
