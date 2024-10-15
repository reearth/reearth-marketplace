import { ApolloProvider, ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

import { useAuth } from "@marketplace/auth";
import { getConfig } from "@marketplace/config";
import { useError } from "@marketplace/state";

type Props = {
  children?: React.ReactNode;
  accessToken?: string;
};

const Provider: React.FC<Props> = ({ children, accessToken: accessToken2 }) => {
  const cofig = getConfig();
  const endpoint = cofig?.marketplaceApi ? `${cofig.marketplaceApi}/graphql` : "/api/graphql";
  const [, setError] = useError();
  const { getAccessToken } = useAuth();

  const authLink = setContext(async (_, { headers }) => {
    let accessToken: string | undefined;
    try {
      // get the authentication token from local storage if it exists
      accessToken = accessToken2 || (await getAccessToken());
    } catch {
      // ignore
    }
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (!networkError && !graphQLErrors) return;
    const error = networkError?.message ?? graphQLErrors?.map(e => e.message).join(", ");
    if (error) {
      setError(error);
    }
  });

  const uploadLink = createUploadLink({
    uri: endpoint,
  });

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          plugins: {
            keyArgs: [
              "input",
              ["keyword", "liked", "tags", "types", "publisher", "sort", "first", "offset"],
            ],
          },
        },
      },
      Me: {
        fields: {
          plugins: {
            keyArgs: ["first", "offset"],
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    uri: endpoint,
    link: ApolloLink.from([
      errorLink,
      authLink,
      // https://github.com/apollographql/apollo-client/issues/6011#issuecomment-619468320
      uploadLink as unknown as ApolloLink,
    ]),
    cache,
    connectToDevTools: !!import.meta.env.DEV,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
