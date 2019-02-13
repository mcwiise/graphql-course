import { GraphQLServer } from 'graphql-yoga'
import { userInfo } from 'os';

// Scalar types in graphql: String, Boolean, Int, float, ID

// Type definitions (Schema)
const typeDefs = `
    type Query {
        add(numbers: [Float!]!): Float!
        greeting(name: String): String!
        grades: [Int!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
    }
`

// Resolvers - functions that will be executed for every action or query happening in the api
const  resolvers = {
    Query: {
        add(parent, args, ctx, info){
            if (args.numbers.length === 0){
                return 0
            }
            return args.numbers.reduce((accumulator, currentValue)=>{
                return accumulator + currentValue
            })
        },
        greeting( parent, args, ctx, info ){
            if(args.name) {
                return `Hello, ${args.name}`
            } else {
                return 'Hello everyone'
            }
        },
        grades(parent, args, ctx, info){
            return [99,80,93]
        },
        me(){
            return {
                id: '123456',
                name: 'German',
                email: 'gvalenncia@gmail.com'
            }
        },
        post(){
            return {
                id: '888',
                title: 'new post',
                body: 'asdfasdf'
            }
        }
    }
}

// Startin gthe serer
const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('up and running!')
})