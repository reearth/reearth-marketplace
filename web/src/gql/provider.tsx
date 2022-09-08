import { ApolloProvider, ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useAuth } from "@marketplace/auth";
import { useError } from "@marketplace/state";
import { createUploadLink } from "apollo-upload-client";

type Props = {
  children?: React.ReactNode;
  api?: string;
  accessToken?: string;
};

const Provider: React.FC<Props> = ({ children, accessToken: accessToken2 }) => {
  const endpoint = window.REEARTH_CONFIG?.marketplaceApi
    ? `${window.REEARTH_CONFIG.marketplaceApi}/graphql`
    : "/api/graphql";
  const [, setError] = useError();
  const { getAccessToken } = useAuth();

  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const accessToken = accessToken2 || (await getAccessToken());
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

  const cache = new InMemoryCache({});

  const client = new ApolloClient({
    uri: endpoint,
    link: ApolloLink.from([errorLink, authLink, uploadLink]),
    cache,
    connectToDevTools: process.env.NODE_ENV === "development",
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
