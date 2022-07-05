import axios from 'axios'

// const movieClient = axios.create({
//     baseURL: 'https://localhost:4017',
//     timeout: 1000,
//     headers: {
//         'Accept': 'application/vnd.GitHub.v3+json',
//         //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
//     }
// });


export default () => {

    return {
        isLoggedIn: false,
        token: null,
        loading: false,
        user: {
            username: 'gideon877',
            password: 'password'
        },
        getUser() {
            console.log(this.user, ' user');
            
            return {
                ...this.user,
                token: this.token,
                isLoggedIn: !this.token
            }
        },
        signIn() {
            this.loading = true;
            this.getUser()
            axios
                .post('http://localhost:4017/v1/signIn', {
                    username: 'gideon877',
                    password: 'password'
                })
                .then(r => r.data)
                .then(data => {
                    const { movies, user, token } = data;
                    this.loading = false;
                    this.isLoggedIn = true;
                    [this.user, this.playlist, this.token] = [user, movies, token];
                })
                .catch(e => console.log({ e }))

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
