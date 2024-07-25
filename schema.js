export const typeDefs = `#graphql
  type Game {
    id: ID!,
    title: String!,
    platform: [String!]!
    reviews: [Review!]
  }
  type Review {
    id: ID!,
    rating: Int!,
    content: String,
    game: Game!,
    author: Author!
  }
  type Author {
    id: ID!,
    name: String!,
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    games: [Game],
    reviews: [Review],
    authors: [Author],
    review(id: ID!): Review,
    author(id: ID!): Author,
    game(id: ID!): Game
  }
  type Mutation {
    deleteGame(id: ID!) : [Game],
    addGame(game: AddGameInput): Game
  }
  input AddGameInput {
    title: String!,
    platform: [String!]!
  }
`
