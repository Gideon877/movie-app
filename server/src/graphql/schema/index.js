const { gql } = require('apollo-server');

module.exports = gql`
    
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        username: String!
        password: String
        email: String
        active: Boolean!
        lastSeen: String!
        createdAt: String!
        updatedAt: String!
        userType: String
    }

    input UserInput {
        firstName: String!
        lastName: String!
        username: String!
        password: String
        email: String
    }

    type Auth {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type Query {
        users: [User!]!
        getUser(userId: ID!): User!
    }

    type Mutation {
        addUser(user: UserInput): Boolean
        # disableUser(userId: ID!, active: Boolean): Boolean 
        signIn(username: String!, password: String!): Auth!
        # updateUser(user: UserInput): Boolean
    }

    # type Subscription {
    #    onUpdateSchedule: [Schedule]
    # }

    schema {
        query: Query,
        mutation: Mutation,
        # subscription: Subscription
    }
`