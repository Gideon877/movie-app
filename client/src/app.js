import _ from 'lodash'
import moment from 'moment';
import Auth from './auth.js';
import Handler from './handler.js';
import { POPULAR_URL, SearchState, URL, appState } from './constants';
const auth = Auth();



export default () => {
    return {
        ...auth,
        ...Handler(),
        token: Alpine.$persist(0),
        time: Alpine.$persist(0),
        header: 'Dintshwantsho',
        screenIcon: 'film',
        search: {
            isLoading: false,
            text: '',
            showErrorMessage: false
        },
        movies: [],
        playlist: Alpine.$persist([]),
        page: 0,
        pages: 0,
        results: 0,
        resultHeader: SearchState.Popular,
        id: Alpine.$persist([]),
        favorite(id){
            (!this.id.includes(id)) 
                ? this.id.push(id)
                : this.id = this.id.filter(_id => _id != id)

            this.getMovies(POPULAR_URL)
        },
        init() {
            this.loading = true
            setTimeout(() => {
                this.user = auth.getUser();
                this.getMovies(POPULAR_URL);
                this.loading = false;
            }, 900)
            // setTimeout(()=> this.signIn(), 2000)

            if(this.token !== 0 && this.token !== null) {
                this.isLoggedIn = true;
                this.screen = appState.Home
            }


        },
        searchUrl() {
            return `${URL}/${this.search.text}`
        },
        onSearch() {
            this.search.isLoading = true;
            _.isEmpty(this.search.text) ? this.getMovies(POPULAR_URL) : this.getMovies(this.searchUrl());

            if(this.screen == appState.Playlist) {
                
            }
            // console.log('typing...', _.size(this.search.text));
        },
        userLikedMovies(){
            alert('Liked movies')
        },
        getMovies(url) {
            console.log(url);
            if (url == POPULAR_URL) {
                this.resultHeader = SearchState.Popular
            } else {
                this.resultHeader = SearchState.Search
            }

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.page = data.page;
                    this.pages = data.total_pages;
                    this.results = data.total_results;
                    this.movies =  _.sortBy(data.results, ['title', ['asc']])
                        .map(film => ({
                            ...film,
                            release_date: moment(film.release_date).fromNow(),
                            liked: this.id.includes(film.id)
                        }));
                    
                    this.search.showErrorMessage = _.isEmpty(this.movies);
                })
                .catch(err => console.error(err));
            setTimeout(() => this.search.isLoading = false, 1000);
        },
        changeScreen(current){
            // alert(current)
            this.screen = current;
            if(current == appState.Playlist) {
                console.log(this.playlist);
                this.screenIcon = 'list'
                this.movies = this.playlist;
            }

            if (current == appState.Profile) {
                this.screenIcon = 'user'
            }
            
            if(current == appState.Home) {
                this.screenIcon = 'home'
                this.getMovies(POPULAR_URL);
            }
        },
    }

}
