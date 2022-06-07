import _ from 'lodash'
import moment from 'moment';
import Auth from './auth.js';
import { POPULAR_URL, SearchState, URL } from './constants';
const auth = Auth();

export default () => {

    return {
        token: Alpine.$persist(0),
        time: Alpine.$persist(0),
        user: {},
        header: 'Dintshwantsho',
        search: {
            isLoading: false,
            text: ' ',
            showErrorMessage: false
        },
        movies: [],
        page: 0,
        pages: 0,
        results: 0,
        resultHeader: SearchState.Popular,
        init() {
            
            setInterval(() => {
                this.time = moment().format('MMMM Do YYYY, h:mm:ss a');
                this.count++;
            }, 1000);

            this.user = auth.getUser();
            this.getMovies(POPULAR_URL);

        },
        searchUrl() {
            return `${URL}/${this.search.text}`
        },
        onSearch() {
            this.search.isLoading = true;
            _.isEmpty(this.search.text) ? this.getMovies(POPULAR_URL) : this.getMovies(this.searchUrl());
            console.log('typing...', this.search.text == '');
        },
        getMovies(url) {
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
                    this.movies = data.results
                        .map(film => ({
                            ...film,
                            // release_date: moment(film.release).fromNow()
                        }));

                    this.search.showErrorMessage = _.isEmpty(this.movies);
                })
                .catch(err => console.error(err));
            setTimeout(() => this.search.isLoading = false, 1000);
        }
    }

}
