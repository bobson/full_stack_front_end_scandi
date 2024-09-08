import { ApolloClient, InMemoryCache, DocumentNode } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://3.67.196.100/graphql",
});

export const fetchGraphQLData = async (query: DocumentNode, variables = {}) => {
  try {
    const result = await client.query({
      query,
      variables,
    });
    return result.data;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error(error.message);
      throw new Error(error.message);
    }
    console.error("An unknown error occurred");
    throw new Error("An unknown error occurred");
  }
};

export const fetchGraphQLMutation = async (
  mutation: DocumentNode,
  variables = {}
) => {
  try {
    const result = await client.mutate({
      mutation,
      variables,
    });
    return result.data;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error(error.message);
      throw new Error(error.message);
    }
    console.error("An unknown error occurred");
    throw new Error("An unknown error occurred");
  }
};
