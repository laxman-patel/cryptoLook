import { gql } from "apollo-server";

export const typeDefs = gql`
  type cryptoCoin {
    id: Int!
    name: String!
    symbol: String!
    marketCap: Float!
    change: Float!
    rank: Int!
    price: Float!
    icon: String!
  }

  type Query {
    "test to make sure server is working"
    hello: String
    getAllCrypto(limit: Int, offset: Int): [cryptoCoin]!
  }
`;
