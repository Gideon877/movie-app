const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const Fn = require('./constants');
const auth = require("./middleware/auth");

module.exports = async (app, db) => {

    const fn = await Fn(db);

    app.post('/v1/signUp', async (req, res) => {
        try {
            const { username, password } = req.body;
            const existingUser = await fn.getUser(username);

            if (existingUser !== null) {
                throw new Error('A user with the same username already exists. Specify another username.')
            }
            const hashedPassword = await bcrypt.hash(password, 16);

            await fn.createUser({ username, password: hashedPassword });
            res.status(200).json({
                status: 'success',
                message: 'A new user account have been created!'
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                status: 'failed',
                error: error.stack
            })
        }
    });

    app.post('/v1/signIn', async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await await fn.getUser(username);
            
            if (username && user.username) {
                const isEqual = await bcrypt.compare(password, user.password);
                if (!isEqual) {
                    throw new Error('Password is incorrect!');
                }
                const token = jwt.sign({ username }, 'secret', { expiresIn: '5h' });

                res.status(200).json({
                    token,
                    user,
                    movies: await fn.getUserMovies(user.id)
                })

            } else {
                res.status(500).json({ error: `Incorrect username!` })
            }
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    });

    app.get('/v1/:userId', async (req, res) => {
        try {
            const { userId } = req.params
            const user = await fn.getUserById(userId);
            const movies = await fn.getUserMovies(userId);

            console.log(user, movies);


            res.status(200).json({
                ...user,
                movies
            })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    });

    app.post('/v1/:userId', async (req, res) => {
        try {
            const [userId, movieId] = [req.params.userId, req.body.movieId];
            const isAdded = await fn.addMovie({ userId, movieId });
            if (!isAdded) throw new Error('Cannot add Duplicate!');

            res.status(200)
                .json({ userId, message: 'Movie successfully added from db!' });

        } catch (error) {
            res.status(500)
                .json({ message: error.message });
        }
    });

    app.delete('/v1/:userId', async (req, res) => {
        try {
            const [userId, movieId] = [req.params.userId, req.body.movieId];
            const isDeleted = await fn.deleteMovie({ userId, movieId });
            if (!isDeleted) throw Error('Failed to delete movie from playlist!')

            res.status(200).json({
                userId,
                message: 'Movie successfully removed from db!'

            })
        } catch (error) {
            res.status(500).json(error)
        }
    });

    app.delete('/v1/:userId/all', async (req, res) => {
        try {
            const { userId } = req.params;
            const isDeleted = await fn.deleteAllMoviesForUser(userId);
            if (!isDeleted) throw Error('Failed to delete movie from playlist!')

            res.status(200).json({
                userId,
                message: 'Movies successfully removed from db!'
            })
        } catch (error) {
            res.status(500).json(error)
        }
    });



    // signUp, SignIn, show User + Movies (CRUD)
}