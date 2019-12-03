export default function ({ store, redirect, route }) {
    if (!store.getters["user/isRoot"]) {
        return redirect("/tap");
    }

    return;
};
