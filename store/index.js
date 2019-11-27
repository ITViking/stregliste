export const state = () => ({
    user: {}
});

export const mutations = {
    setUser(state, user) {
        state.user = user;
    }
}

export const getters = {
    getUser(state) {
        if(state.user) return state.user;
    }
}