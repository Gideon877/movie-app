const URL = `https://api.themoviedb.org/3/search/movie?api_key=7e719bfe3cd3786ebf0a05d3b138853d&query=`;
const POPULAR_URL = `https://api.themoviedb.org/3/discover/movie?api_key=7e719bfe3cd3786ebf0a05d3b138853d&sort_by=popularity.desc`;
const SearchState = {
    Popular: 'POPULAR',
    Search: 'SEARCH',
}

/** 
 *  https://api.themoviedb.org/3/movie/338953?api_key=7e719bfe3cd3786ebf0a05d3b138853d
 *  &append_to_response=videos
*/

const queryForDetails = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=7e719bfe3cd3786ebf0a05d3b138853d&append_to_response=videos`

const Pages = {
    HOME: 'HOME',
    Playlist: 'PLAYLIST',
    Profile: 'PROFILE',
    More: 'MORE',
}

class User {

    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.isLoggedIn = false;
    }

    

}



export {
    URL, POPULAR_URL, SearchState, Pages, User, queryForDetails
}