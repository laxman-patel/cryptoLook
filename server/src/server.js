import { ApolloServer } from "apollo-server";
import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/typedefs.js";
import { cronJob } from "./lib/job.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

cronJob();

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
