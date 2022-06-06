const mongoose = require('mongoose');
const graphqlSchema = require('./src/graphql/schema');
const graphqlResolvers = require('./src/graphql/resolvers');
const { ApolloServer } = require('apollo-server');
const isAuth = require('./src/middleware/is-auth')

const app = new ApolloServer({
    typeDefs: graphqlSchema,
    resolvers: graphqlResolvers,
    context: isAuth
});

const mongoURL = (process.env.NODE_ENV === 'development') ? process.env.MONGO_DB_LOCAL_URL : process.env.MONGO_DB_URL

mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.listen(process.env.PORT, () => console.log(`🚀App running on http://localhost:${process.env.PORT}`)) })
    .catch(err => console.log(err))