import { queryForDetails } from './constants';

export default () => {

    return {
        selectedFilm: {},
        add(id) {
            console.log(id, '\n\n add')
        },
        info(id) {
            this.getMovieById(id)
            console.table(this.selectedFilm, '\n\n info')
            $('.ui.modal')
                .modal('show')
                ;
        },

        getMovieById(id) {
            const url = queryForDetails(id);
            fetch(url)
                .then(res => res.json())
                .then(data => this.selectedFilm = data)
                .catch(err => console.error(err))
        },
    }
}