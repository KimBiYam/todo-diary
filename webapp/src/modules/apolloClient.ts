import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import tokenStorage from '../storage/tokenStorage';
import { BACKEND_SERVER_URL } from '../constants';
import { offsetLimitPagination } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: `${BACKEND_SERVER_URL}/graphql`,
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = tokenStorage.getToken();
  operation.setContext({
    headers: {
      authorization: accessToken
        ? `${import.meta.env.VITE_TOKEN_PREFIX} ${accessToken}`
        : '',
    },
  });
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Diary: {
        keyFields: ['id'],
      },
      User: {
        keyFields: ['id'],
      },
      Query: {
        fields: {
          Diary: offsetLimitPagination(),
        },
      },
    },
  }),
});
