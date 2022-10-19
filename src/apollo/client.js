import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/",
});
// import ApolloClient from "apollo-boost";

// export const client = new ApolloClient({
//   uri: "http://localhost:4000/",
// });
