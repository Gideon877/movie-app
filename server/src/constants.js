const _ = require('lodash');
const axios = require('axios');

module.exports = async (db) => {

    async function isAdded({ movieId, userId }) {
        try {
            const movie = await db.oneOrNone('select * from user_movies where user_id = $1 and movie_id = $2', [userId, movieId])
            return !_.isEmpty(movie);
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    const queryForDetails = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=7e719bfe3cd3786ebf0a05d3b138853d&append_to_response=videos`
    
    function getMovieById(id) {
        const url = queryForDetails(id);
        return axios.get(url)
            .then(data => data.data)
            .catch(err => err)
    }


    return {
        getUser: async (username) => {
            return await db.oneOrNone('select * from users where username = $1', [username])
        },
        getUserById: async (userId) => {
            return await db.oneOrNone('select * from users where id = $1', [userId])
        },

        getUserMovies: async (userId) => {
            const results = await db.manyOrNone('select * from user_movies where user_id = $1', [userId]);
            return await Promise.all(
                results.map(item => {
                    return getMovieById(item.movie_id)

                })
            )
        },

        createUser: async ({ username, password }) => {
            try {
                await db.none('insert into users (username, password) values ($1, $2);', [username, password])
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        },

        addMovie: async ({ movieId, userId }) => {
            try {
                if (await isAdded({ movieId, userId })) throw Error('Movie already added!')

                await db.none('insert into user_movies (user_id, movie_id) values ($1, $2)', [userId, movieId])
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        },

        deleteMovie: async ({ movieId, userId }) => {
            try {
                await db.none('delete from user_movies where user_id = $1 and movie_id = $2', [userId, movieId])
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        },


        deleteAllMoviesForUser: async (userId) => {
            try {
                await db.none('delete from user_movies where user_id = $1', [userId])
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        },








    }

}