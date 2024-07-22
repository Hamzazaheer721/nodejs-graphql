import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import dotenv from "dotenv"
import { typeDefs } from "./schema.js"
import _db from "./_db.js"

dotenv.config()

const port = process.env.PORT

/* Resolver */
const resolvers = {
  Query: {
    /* Function names should be same as defined in typedefs' Query type */
    games: () => {
      return _db.games
    },
    authors: () => {
      return _db.authors
    },
    reviews: () => {
      return _db.reviews
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  // context: async (req) => {
  //   {
  //     token: req.headers.token
  //   }
  // },
  listen: { port }
})

console.info("the server is running on port", port)
