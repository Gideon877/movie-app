require('dotenv').config()
const express = require('express');
const cors = require('cors');
const PgPromise = require("pg-promise")

const API = require('./src/api');
const app = express();
// enable the static folder...
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/movie_app';

const pgp = PgPromise({});
const db = pgp({
    connectionString: DATABASE_URL,
    max: 30,
    // ssl: {
    //     rejectUnauthorized: false
    // }
});

API(app, db);

const PORT = process.env.PORT || 4017;

app.listen(PORT, function () {
    console.log(`App started on http://localhost:${PORT}`);
});