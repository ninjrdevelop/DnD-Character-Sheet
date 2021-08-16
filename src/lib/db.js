import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";

const authToken = 'rzrLHhpxSQiKAsw6TKV9chfG0iFUgbDIal4r45543Xyvs3ofsWFtkdiOg7138jZ8';

const headers = {
  'content-type': 'application/json',
  'x-hasura-admin-secret': `${authToken}`
};
const getHeaders = () => {
  return headers;
};

const cache = new InMemoryCache();

const wsLink = new WebSocketLink({
  uri: "https://free-turtle-47.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => {
      return { headers: getHeaders() };
    },
  },
});

const httpLink = new HttpLink({
  uri: "https://free-turtle-47.hasura.app/v1/graphql",
  headers: getHeaders()
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link,
  cache
});