const authResolver = require('./auth');
const fileResolver = require('./file');
const blogResolver = require('./connections');
const { userType, EventTypes } = require('../helpers/constants');

const { users, getUser, findUsers } = authResolver.Query;
// const { getFile } = fileResolver.Query;
// const { } = blogResolver.Query;

const { addUser, signIn, updateUser, disableUser } = authResolver.Mutation;
const { addFile } = fileResolver.Mutation;
// const { } = blogResolver.Mutation;


const Resolver = {
    Query: {
        users,
        getUser,

    },
    Mutation: {
        addUser,
        // disableUser,
        signIn,
        // updateUser,
        
    },
    // Subscription: {
    //     onUpdateSchedule: {
    //         subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(EventTypes.UpdateSchedule)
    //     }
    // }

}

module.exports = Resolver;