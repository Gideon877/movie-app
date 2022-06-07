export default () => {

    return {
        isLoggedIn: true,
        token: null,
        user: null,
        loading: false,
        getUser() {
            return {
                ...this.user,
                token: this.token,
                isLoggedIn: !this.token
            }
        },
        signIn() {
            this.isLoggedIn = true;
        },

        signOut() {
            this.token = null;
            this.user = null;
            this.isLoggedIn = false;

            // API

            setTimeout(() => {
                this.loading = false;
            }, 2000)
        },

        signUp() {
            // check user input
            // call API
            // display results
        },
    }
}
