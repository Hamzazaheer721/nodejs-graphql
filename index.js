import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import dotenv from "dotenv"
import { typeDefs } from "./schema.js"

dotenv.config()

const port = process.env.PORT

const server = new ApolloServer({
  typeDefs
  /* resolvers */
})

const { url } = await startStandaloneServer(server, {
  context: async (req) => {
    {
      token: req.headers.token
    }
  },
  listen: { port }
})

console.info("the server is running on port", port)
