import { createSchema } from "graphql-yoga";
import { resolvers } from "./resovlers";
import { typeDefs } from "./typeDefs";

export const schema = createSchema({
  typeDefs,
  resolvers,
});
