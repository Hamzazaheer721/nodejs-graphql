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
    /* These are resolvers for the entry point in graphql */
    /* Function names should be same as defined in typedefs' Query type */
    games: () => {
      return _db.games
    },
    authors: () => {
      return _db.authors
    },
    reviews: () => {
      return _db.reviews
    },
    /* Query Variables */
    review: (_, args) => {
      const id = args?.id
      return _db.reviews.find((review) => review.id === id)
    },
    author: (_, args) => {
      const id = args?.id
      return _db.authors.find((author) => author.id === id)
    },
    game: (_, args) => {
      const id = args?.id
      return _db.games.find((game) => game.id === id)
    }
  },
  /* All the types from typedefs can be used here for chaining */
  /* now make use of polymorphism, we will override the methods from Query */
  Author: {
    /* reviews is present as attribute in Author type */
    reviews: (parent) => {
      /* parent is returning resultant from Query.author or Query.authors */
      return _db.reviews?.filter((review) => review.author_id === parent?.id)
    }
  },
  Review: {
    game: (parent) => {
      return _db.games.find((game) => game.id === parent.game_id)
    },
    author: (parent) => {
      return _db.authors.find((author) => author.id === parent.author_id)
    }
  },
  Game: {
    reviews: (parent) => {
      return _db.reviews.filter((review) => review.game_id === parent.id)
    }
  },
  Mutation: {
    deleteGame: (_, args) => {
      const id = args.id
      _db.games = _db.games.filter((game) => game.id !== id)
      return _db.games
    },
    addGame: (_, args) => {
      const game_ = args.game
      const game = {
        ...game_,
        id: Math.floor(Math.random() * 1000).toString()
      }
      _db.games.push(game)
      return game
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
