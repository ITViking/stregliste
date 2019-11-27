
export default function ({ store, redirect, route }) {

    console.log("hit mw");
    if(!store.state.user) return redirect("/");
    return redirect();
};
