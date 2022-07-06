import axios from 'axios'

const appState = {
    About: 'ABOUT',
    Home: 'HOME',
    Playlist: 'PLAYLIST',
    Profile: 'PROFILE',
    SignIn: 'SIGN_IN',
    SignUp: 'SIGN_UP',
    SignOut: 'SIGN_OUT',
}

export default () => {

    return {
        isLoggedIn: false,
        token: null,
        loading: false,
        screen: appState.SignIn,
        user: {
            username: 'giddeon877',
            password: 'password',
            firstName: '',
            lastName: '',
        },
        authMessage: '',
        getUser() {
            return {
                ...this.user,
                token: this.token,
                isLoggedIn: !this.token
            }
        },
        signIn() {
            this.loading = true;
            this.getUser();
            // this.authMessage = 'Verifying user account'
            // console.log(this.user);
            axios
                .post('http://localhost:4017/v1/signIn', this.user)
                .then(r => r.data)
                .then(data => {
                    const { movies, user, token } = data;
                    this.loading = false;
                    this.isLoggedIn = true;
                    this.screen = appState.Home;
                    [this.user, this.playlist, this.token] = [user, movies, token];
                    localStorage.setItem('user', JSON.stringify(user))
                })
                .catch(e => {
                    const { message } = e.response.data
                    this.authMessage = message
                    setTimeout(()=> {
                        this.loading = false;
                        this.authMessage = ''
                    }, 4000)
                })

        },

        signOut() {
            this.token = null;
            this.user = null;
            this.isLoggedIn = false;
            localStorage.clear()
            // API
            setTimeout(() => {
                this.screen = appState.SignIn
                this.loading = false;
            }, 2000)
        },

        signUp() {
            alert('sign up')
            // check user input
            // call API
            // display results
        },
    }
}
