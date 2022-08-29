import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: string;
  Lang: any;
  Time: Date;
  URL: string;
  Upload: any;
};

export type CreateOrganizationInput = {
  description?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<Array<Scalars['ID']>>;
  name: Scalars['String'];
};

export type CreatePluginInput = {
  file?: InputMaybe<Scalars['Upload']>;
  repo?: InputMaybe<Scalars['String']>;
};

export type DeleteOrganizationInput = {
  organizationId: Scalars['ID'];
};

export type DeleteOrganizationPayload = {
  __typename?: 'DeleteOrganizationPayload';
  organizationId: Scalars['ID'];
};

export type DeletePluginInput = {
  pluginId: Scalars['ID'];
};

export type DeletePluginPayload = {
  __typename?: 'DeletePluginPayload';
  pluginId: Scalars['ID'];
};

export type DeleteVersionInput = {
  versionId: Scalars['ID'];
};

export type DeleteVersionPayload = {
  __typename?: 'DeleteVersionPayload';
  versionId: Scalars['ID'];
};

export type LikePluginInput = {
  pluginId: Scalars['ID'];
};

export type Me = Publisher & {
  __typename?: 'Me';
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lang?: Maybe<Scalars['Lang']>;
  name: Scalars['String'];
  plugins: PluginConnection;
  publishable: Scalars['Boolean'];
  tel?: Maybe<Scalars['String']>;
};


export type MePluginsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type MePayload = {
  __typename?: 'MePayload';
  me: Me;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrganization: OrganizationPayload;
  createPlugin: PluginPayload;
  deleteOrganization: DeleteOrganizationPayload;
  deletePlugin: DeletePluginPayload;
  deleteVersion: DeleteVersionPayload;
  likePlugin: PluginPayload;
  parsePlugin: PluginPayload;
  unlikePlugin: PluginPayload;
  updateMe: MePayload;
  updateOrganization: OrganizationPayload;
  updatePlugin: PluginPayload;
  updateVersion: VersionPayload;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreatePluginArgs = {
  input: CreatePluginInput;
};


export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInput;
};


export type MutationDeletePluginArgs = {
  input: DeletePluginInput;
};


export type MutationDeleteVersionArgs = {
  input: DeleteVersionInput;
};


export type MutationLikePluginArgs = {
  input: LikePluginInput;
};


export type MutationParsePluginArgs = {
  input: CreatePluginInput;
};


export type MutationUnlikePluginArgs = {
  input: UnlikePluginInput;
};


export type MutationUpdateMeArgs = {
  input: UpdateMeInput;
};


export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


export type MutationUpdatePluginArgs = {
  input: UpdatePluginInput;
};


export type MutationUpdateVersionArgs = {
  input: UpdateVersionInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type Organization = Node & Publisher & {
  __typename?: 'Organization';
  active: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  memberIds: Array<Scalars['ID']>;
  members: Array<User>;
  name: Scalars['String'];
  plugins: PluginConnection;
};


export type OrganizationPluginsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type OrganizationPayload = {
  __typename?: 'OrganizationPayload';
  organization: Organization;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Cursor']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['Cursor']>;
};

export type Plugin = Node & {
  __typename?: 'Plugin';
  active: Scalars['Boolean'];
  author?: Maybe<Scalars['String']>;
  createdAt: Scalars['Time'];
  description?: Maybe<Scalars['String']>;
  downloads: Scalars['Int'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images: Array<Scalars['URL']>;
  latestVersion?: Maybe<Version>;
  like: Scalars['Int'];
  liker: Array<User>;
  likerIds: Array<Scalars['ID']>;
  name: Scalars['String'];
  publishedAt: Scalars['Time'];
  publisher: Publisher;
  publisherId: Scalars['ID'];
  readme: Scalars['String'];
  repository?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  type: PluginType;
  updatedAt: Scalars['Time'];
  versions: Array<Version>;
};

export type PluginConnection = {
  __typename?: 'PluginConnection';
  edges: Array<PluginEdge>;
  nodes: Array<Maybe<Plugin>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PluginEdge = {
  __typename?: 'PluginEdge';
  cursor: Scalars['Cursor'];
  node?: Maybe<Plugin>;
};

export type PluginPayload = {
  __typename?: 'PluginPayload';
  plugin: Plugin;
};

export enum PluginSort {
  DownloadsAsc = 'DOWNLOADS_ASC',
  DownloadsDesc = 'DOWNLOADS_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PublishedatAsc = 'PUBLISHEDAT_ASC',
  PublishedatDesc = 'PUBLISHEDAT_DESC',
  PublisherAsc = 'PUBLISHER_ASC',
  PublisherDesc = 'PUBLISHER_DESC'
}

export enum PluginType {
  Reearth = 'REEARTH',
  ReearthCms = 'REEARTH_CMS'
}

export type PluginsInput = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  liked?: InputMaybe<Scalars['Boolean']>;
  publisher?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<PluginSort>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  types?: InputMaybe<Array<PluginType>>;
};

export type Publisher = {
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  plugins: PluginConnection;
};


export type PublisherPluginsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  me: Me;
  node?: Maybe<Node>;
  nodes: Array<Node>;
  plugins: PluginConnection;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryPluginsArgs = {
  input: PluginsInput;
};

export type UnlikePluginInput = {
  pluginId: Scalars['ID'];
};

export type UpdateMeInput = {
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['Lang']>;
  name?: InputMaybe<Scalars['String']>;
  tel?: InputMaybe<Scalars['String']>;
};

export type UpdateOrganizationInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  deletedMembers?: InputMaybe<Array<Scalars['ID']>>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  newMembers?: InputMaybe<Array<Scalars['ID']>>;
  organizationId: Scalars['ID'];
};

export type UpdatePluginInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  deletedTags?: InputMaybe<Array<Scalars['String']>>;
  images?: InputMaybe<Array<Scalars['Upload']>>;
  newTags?: InputMaybe<Array<Scalars['String']>>;
  pluginId: Scalars['ID'];
};

export type UpdateVersionInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  pluginId: Scalars['ID'];
  version: Scalars['String'];
};

export type User = Node & Publisher & {
  __typename?: 'User';
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  organizationIds: Array<Scalars['ID']>;
  organizations: Array<Organization>;
  plugins: PluginConnection;
};


export type UserPluginsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Version = {
  __typename?: 'Version';
  active: Scalars['Boolean'];
  checksum: Scalars['String'];
  createdAt: Scalars['Time'];
  description: Scalars['String'];
  downloads: Scalars['Int'];
  publishedAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
  url?: Maybe<Scalars['String']>;
  version: Scalars['String'];
};

export type VersionPayload = {
  __typename?: 'VersionPayload';
  plugin: Plugin;
  version: Version;
};

export type PluginQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PluginQuery = { __typename?: 'Query', node?: { __typename?: 'Organization' } | { __typename?: 'Plugin', id: string, images: Array<string>, author?: string | null, like: number, downloads: number, name: string, latestVersion?: { __typename?: 'Version', version: string } | null } | { __typename?: 'User' } | null };

export type SearchPluginQueryVariables = Exact<{
  first: Scalars['Int'];
  keyword?: InputMaybe<Scalars['String']>;
  liked?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<PluginType> | PluginType>;
  publisher?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<PluginSort>;
  after?: InputMaybe<Scalars['Cursor']>;
}>;


export type SearchPluginQuery = { __typename?: 'Query', plugins: { __typename?: 'PluginConnection', totalCount: number, nodes: Array<{ __typename?: 'Plugin', id: string, images: Array<string>, author?: string | null, like: number, downloads: number, name: string } | null>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };

export type LikePluginMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LikePluginMutation = { __typename?: 'Mutation', likePlugin: { __typename?: 'PluginPayload', plugin: { __typename?: 'Plugin', id: string, like: number } } };

export type UnlikePluginMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlikePluginMutation = { __typename?: 'Mutation', unlikePlugin: { __typename?: 'PluginPayload', plugin: { __typename?: 'Plugin', id: string, like: number } } };


export const PluginDocument = gql`
    query Plugin($id: ID!) {
  node(id: $id) {
    ... on Plugin {
      id
      images
      author
      like
      downloads
      name
      latestVersion {
        version
      }
    }
  }
}
    `;

/**
 * __usePluginQuery__
 *
 * To run a query within a React component, call `usePluginQuery` and pass it any options that fit your needs.
 * When your component renders, `usePluginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePluginQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePluginQuery(baseOptions: Apollo.QueryHookOptions<PluginQuery, PluginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PluginQuery, PluginQueryVariables>(PluginDocument, options);
      }
export function usePluginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PluginQuery, PluginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PluginQuery, PluginQueryVariables>(PluginDocument, options);
        }
export type PluginQueryHookResult = ReturnType<typeof usePluginQuery>;
export type PluginLazyQueryHookResult = ReturnType<typeof usePluginLazyQuery>;
export type PluginQueryResult = Apollo.QueryResult<PluginQuery, PluginQueryVariables>;
export const SearchPluginDocument = gql`
    query SearchPlugin($first: Int!, $keyword: String, $liked: Boolean, $tags: [String!], $types: [PluginType!], $publisher: ID, $sort: PluginSort, $after: Cursor) {
  plugins(
    input: {keyword: $keyword, liked: $liked, tags: $tags, types: $types, publisher: $publisher, sort: $sort, after: $after}
  ) {
    nodes {
      id
      images
      author
      like
      downloads
      name
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;

/**
 * __useSearchPluginQuery__
 *
 * To run a query within a React component, call `useSearchPluginQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPluginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPluginQuery({
 *   variables: {
 *      first: // value for 'first'
 *      keyword: // value for 'keyword'
 *      liked: // value for 'liked'
 *      tags: // value for 'tags'
 *      types: // value for 'types'
 *      publisher: // value for 'publisher'
 *      sort: // value for 'sort'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useSearchPluginQuery(baseOptions: Apollo.QueryHookOptions<SearchPluginQuery, SearchPluginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPluginQuery, SearchPluginQueryVariables>(SearchPluginDocument, options);
      }
export function useSearchPluginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPluginQuery, SearchPluginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPluginQuery, SearchPluginQueryVariables>(SearchPluginDocument, options);
        }
export type SearchPluginQueryHookResult = ReturnType<typeof useSearchPluginQuery>;
export type SearchPluginLazyQueryHookResult = ReturnType<typeof useSearchPluginLazyQuery>;
export type SearchPluginQueryResult = Apollo.QueryResult<SearchPluginQuery, SearchPluginQueryVariables>;
export const LikePluginDocument = gql`
    mutation LikePlugin($id: ID!) {
  likePlugin(input: {pluginId: $id}) {
    plugin {
      id
      like
    }
  }
}
    `;
export type LikePluginMutationFn = Apollo.MutationFunction<LikePluginMutation, LikePluginMutationVariables>;

/**
 * __useLikePluginMutation__
 *
 * To run a mutation, you first call `useLikePluginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePluginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePluginMutation, { data, loading, error }] = useLikePluginMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikePluginMutation(baseOptions?: Apollo.MutationHookOptions<LikePluginMutation, LikePluginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePluginMutation, LikePluginMutationVariables>(LikePluginDocument, options);
      }
export type LikePluginMutationHookResult = ReturnType<typeof useLikePluginMutation>;
export type LikePluginMutationResult = Apollo.MutationResult<LikePluginMutation>;
export type LikePluginMutationOptions = Apollo.BaseMutationOptions<LikePluginMutation, LikePluginMutationVariables>;
export const UnlikePluginDocument = gql`
    mutation UnlikePlugin($id: ID!) {
  unlikePlugin(input: {pluginId: $id}) {
    plugin {
      id
      like
    }
  }
}
    `;
export type UnlikePluginMutationFn = Apollo.MutationFunction<UnlikePluginMutation, UnlikePluginMutationVariables>;

/**
 * __useUnlikePluginMutation__
 *
 * To run a mutation, you first call `useUnlikePluginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikePluginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikePluginMutation, { data, loading, error }] = useUnlikePluginMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnlikePluginMutation(baseOptions?: Apollo.MutationHookOptions<UnlikePluginMutation, UnlikePluginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikePluginMutation, UnlikePluginMutationVariables>(UnlikePluginDocument, options);
      }
export type UnlikePluginMutationHookResult = ReturnType<typeof useUnlikePluginMutation>;
export type UnlikePluginMutationResult = Apollo.MutationResult<UnlikePluginMutation>;
export type UnlikePluginMutationOptions = Apollo.BaseMutationOptions<UnlikePluginMutation, UnlikePluginMutationVariables>;