export const state = () => ({
    authUser: {
        signedIn: false,
    }
});

export const mutations = {
    set(state, user) {
        state.authUser = { ...user };
    },
    signOut(state) {
        state.authUser.signedIn = false
    },
    signIn(state) {
        state.authUser.signedIn = true;
    }
}

export const getters = {
    get(state) {
        return state.authUser;
    },
    isSignedIn(state) {
        return state.authUser.signedIn;
    },
    isAdmin(state) {
        return state.authUser.isAdmin;
    },
    isRoot(state) {
        return state.authUser.isRoot;
    }
}
