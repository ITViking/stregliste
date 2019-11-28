
export default function ({ store, redirect, route }) {
    if (route.path == "/tap" && !store.state.user.email) return redirect("/");
    if (route.path == "/" && store.state.user.email) return redirect("/tap");
    if(route.path == "/root" && !store.state.user.isRoot) return redirect("/tap");
};
