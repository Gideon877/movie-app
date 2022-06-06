import './style.css'
import Alpine from 'alpinejs';
import moment from 'moment';
import _ from 'lodash'

const SearchState = {
	Popular: 'POPULAR',
	Search: 'SEARCH',
}

const URL = `https://api.themoviedb.org/3/search/movie?api_key=7e719bfe3cd3786ebf0a05d3b138853d&query=`;
const POPULAR_URL = `https://api.themoviedb.org/3/discover/movie?api_key=7e719bfe3cd3786ebf0a05d3b138853d&sort_by=popularity.desc`;

Alpine.data('movies', () => ({
	header: 'Movies',
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
	searchUrl() {
		return `${URL}/${this.search.text}`
	},
	init() {
		this.getMovies(POPULAR_URL);
	},
	onSearch() {
		this.search.isLoading = true;
		_.isEmpty(this.search.text) ? this.getMovies(POPULAR_URL) :  this.getMovies(this.searchUrl());
		console.log('typing...', this.search.text == '');
	},
	getMovies(url) {
		console.log();
		if (url == POPULAR_URL) {
			this.resultHeader = SearchState.Popular
		} else {
			this.resultHeader = SearchState.Search
		}
		console.table(this.resultHeader, 'header');
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

}))

Alpine.start();
