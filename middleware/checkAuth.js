
export default function ({ store, redirect, route }) {
    if (!store.state.user) return redirect("/");
    if (route.path == "/" && store.state.user) {
        return redirect("/tap");
    }
};
