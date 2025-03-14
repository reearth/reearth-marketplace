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
  core?: InputMaybe<Scalars['Boolean']>;
  file?: InputMaybe<Scalars['Upload']>;
  publisher?: InputMaybe<Scalars['ID']>;
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
  offset?: InputMaybe<Scalars['Int']>;
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

export enum NodeType {
  Plugin = 'PLUGIN',
  User = 'USER'
}

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
  core: Scalars['Boolean'];
  createdAt: Scalars['Time'];
  description?: Maybe<Scalars['String']>;
  downloads: Scalars['Int'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images: Array<Scalars['URL']>;
  latestVersion?: Maybe<Version>;
  like: Scalars['Int'];
  liked: Scalars['Boolean'];
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
  offset?: InputMaybe<Scalars['Int']>;
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
  type: NodeType;
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
  type: NodeType;
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
  offset?: InputMaybe<Scalars['Int']>;
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


export type PluginQuery = { __typename?: 'Query', node?: { __typename?: 'Organization', id: string } | { __typename?: 'Plugin', id: string, images: Array<string>, author?: string | null, like: number, downloads: number, name: string, icon?: string | null, readme: string, description?: string | null, liked: boolean, updatedAt: Date, active: boolean, core: boolean, publisher: { __typename?: 'Me', id: string, name: string, displayName?: string | null } | { __typename?: 'Organization', id: string, name: string, displayName?: string | null } | { __typename?: 'User', id: string, name: string, displayName?: string | null }, latestVersion?: { __typename?: 'Version', version: string } | null } | { __typename?: 'User', id: string } | null };

export type PluginsQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PluginsQuery = { __typename?: 'Query', nodes: Array<{ __typename?: 'Organization', id: string } | { __typename?: 'Plugin', id: string, images: Array<string>, author?: string | null, like: number, downloads: number, name: string, icon?: string | null, readme: string, description?: string | null, liked: boolean, updatedAt: Date, core: boolean, publisher: { __typename?: 'Me', id: string, name: string, displayName?: string | null } | { __typename?: 'Organization', id: string, name: string, displayName?: string | null } | { __typename?: 'User', id: string, name: string, displayName?: string | null }, latestVersion?: { __typename?: 'Version', version: string } | null } | { __typename?: 'User', id: string }> };

export type SearchPluginQueryVariables = Exact<{
  first: Scalars['Int'];
  keyword?: InputMaybe<Scalars['String']>;
  liked?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  types?: InputMaybe<Array<PluginType> | PluginType>;
  publisher?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<PluginSort>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type SearchPluginQuery = { __typename?: 'Query', plugins: { __typename?: 'PluginConnection', totalCount: number, nodes: Array<{ __typename?: 'Plugin', id: string, images: Array<string>, author?: string | null, like: number, liked: boolean, downloads: number, name: string, core: boolean, publisher: { __typename?: 'Me', id: string, name: string, displayName?: string | null } | { __typename?: 'Organization', id: string, name: string, displayName?: string | null } | { __typename?: 'User', id: string, name: string, displayName?: string | null } } | null> } };

export type LikePluginMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LikePluginMutation = { __typename?: 'Mutation', likePlugin: { __typename?: 'PluginPayload', plugin: { __typename?: 'Plugin', id: string, like: number, liked: boolean } } };

export type UnlikePluginMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlikePluginMutation = { __typename?: 'Mutation', unlikePlugin: { __typename?: 'PluginPayload', plugin: { __typename?: 'Plugin', id: string, like: number, liked: boolean } } };

export type UpdatePluginMutationVariables = Exact<{
  pluginId: Scalars['ID'];
  active?: InputMaybe<Scalars['Boolean']>;
  images?: InputMaybe<Array<Scalars['Upload']> | Scalars['Upload']>;
  newTags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  deletedTags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type UpdatePluginMutation = { __typename?: 'Mutation', updatePlugin: { __typename?: 'PluginPayload', plugin: { __typename?: 'Plugin', id: string, active: boolean, tags: Array<string>, images: Array<string> } } };

export type CreatePluginMutationVariables = Exact<{
  file?: InputMaybe<Scalars['Upload']>;
  repo?: InputMaybe<Scalars['String']>;
  publisher?: InputMaybe<Scalars['ID']>;
  core?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreatePluginMutation = { __typename?: 'Mutation', createPlugin: { __typename?: 'PluginPayload', plugin: { __typename?: 'Plugin', id: string, name: string, description?: string | null, images: Array<string>, core: boolean, latestVersion?: { __typename?: 'Version', version: string } | null } } };

export type ParsePluginMutationVariables = Exact<{
  file?: InputMaybe<Scalars['Upload']>;
  repo?: InputMaybe<Scalars['String']>;
  core?: InputMaybe<Scalars['Boolean']>;
}>;


export type ParsePluginMutation = { __typename?: 'Mutation', parsePlugin: { __typename?: 'PluginPayload', plugin: { __typename?: 'Plugin', id: string, type: PluginType, name: string, author?: string | null, description?: string | null, icon?: string | null, repository?: string | null, readme: string, core: boolean, publisher: { __typename?: 'Me', id: string, name: string, displayName?: string | null } | { __typename?: 'Organization', id: string, name: string, displayName?: string | null } | { __typename?: 'User', id: string, name: string, displayName?: string | null }, latestVersion?: { __typename?: 'Version', version: string } | null } } };

export type UpdatePluginVersionMutationVariables = Exact<{
  pluginId: Scalars['ID'];
  version: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  active?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdatePluginVersionMutation = { __typename?: 'Mutation', updateVersion: { __typename?: 'VersionPayload', plugin: { __typename?: 'Plugin', id: string, name: string, author?: string | null, description?: string | null, icon?: string | null, repository?: string | null, publishedAt: Date, readme: string, publisher: { __typename?: 'Me', id: string, name: string, displayName?: string | null } | { __typename?: 'Organization', id: string, name: string, displayName?: string | null } | { __typename?: 'User', id: string, name: string, displayName?: string | null }, latestVersion?: { __typename?: 'Version', version: string, description: string, downloads: number, active: boolean, createdAt: Date, updatedAt: Date, publishedAt: Date } | null } } };

export type GetMeQueryVariables = Exact<{
  first: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: string, name: string, lang?: any | null, displayName?: string | null, description?: string | null, plugins: { __typename?: 'PluginConnection', totalCount: number, nodes: Array<{ __typename?: 'Plugin', id: string, images: Array<string>, author?: string | null, like: number, liked: boolean, downloads: number, name: string, readme: string, icon?: string | null, active: boolean, updatedAt: Date, latestVersion?: { __typename?: 'Version', version: string } | null } | null> } } };

export type UpdateMeMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<Scalars['Lang']>;
  displayName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  tel?: InputMaybe<Scalars['String']>;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'MePayload', me: { __typename?: 'Me', id: string, name: string, lang?: any | null, displayName?: string | null, description?: string | null, tel?: string | null } } };


export const PluginDocument = gql`
    query Plugin($id: ID!) {
  node(id: $id, type: PLUGIN) {
    id
    ... on Plugin {
      id
      images
      author
      publisher {
        id
        name
        displayName
      }
      like
      downloads
      name
      icon
      readme
      description
      liked
      updatedAt
      active
      latestVersion {
        version
      }
      core
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
export const PluginsDocument = gql`
    query Plugins($ids: [ID!]!) {
  nodes(ids: $ids, type: PLUGIN) {
    id
    ... on Plugin {
      id
      images
      author
      publisher {
        id
        name
        displayName
      }
      like
      downloads
      name
      icon
      readme
      description
      liked
      updatedAt
      latestVersion {
        version
      }
      core
    }
  }
}
    `;

/**
 * __usePluginsQuery__
 *
 * To run a query within a React component, call `usePluginsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePluginsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePluginsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function usePluginsQuery(baseOptions: Apollo.QueryHookOptions<PluginsQuery, PluginsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PluginsQuery, PluginsQueryVariables>(PluginsDocument, options);
      }
export function usePluginsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PluginsQuery, PluginsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PluginsQuery, PluginsQueryVariables>(PluginsDocument, options);
        }
export type PluginsQueryHookResult = ReturnType<typeof usePluginsQuery>;
export type PluginsLazyQueryHookResult = ReturnType<typeof usePluginsLazyQuery>;
export type PluginsQueryResult = Apollo.QueryResult<PluginsQuery, PluginsQueryVariables>;
export const SearchPluginDocument = gql`
    query SearchPlugin($first: Int!, $keyword: String, $liked: Boolean, $tags: [String!], $types: [PluginType!], $publisher: ID, $sort: PluginSort, $offset: Int) {
  plugins(
    input: {first: $first, keyword: $keyword, liked: $liked, tags: $tags, types: $types, publisher: $publisher, sort: $sort, offset: $offset}
  ) {
    nodes {
      id
      images
      author
      publisher {
        id
        name
        displayName
      }
      like
      liked
      downloads
      name
      core
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
 *      offset: // value for 'offset'
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
      liked
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
      liked
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
export const UpdatePluginDocument = gql`
    mutation UpdatePlugin($pluginId: ID!, $active: Boolean, $images: [Upload!], $newTags: [String!], $deletedTags: [String!]) {
  updatePlugin(
    input: {pluginId: $pluginId, active: $active, images: $images, newTags: $newTags, deletedTags: $deletedTags}
  ) {
    plugin {
      id
      active
      tags
      images
    }
  }
}
    `;
export type UpdatePluginMutationFn = Apollo.MutationFunction<UpdatePluginMutation, UpdatePluginMutationVariables>;

/**
 * __useUpdatePluginMutation__
 *
 * To run a mutation, you first call `useUpdatePluginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePluginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePluginMutation, { data, loading, error }] = useUpdatePluginMutation({
 *   variables: {
 *      pluginId: // value for 'pluginId'
 *      active: // value for 'active'
 *      images: // value for 'images'
 *      newTags: // value for 'newTags'
 *      deletedTags: // value for 'deletedTags'
 *   },
 * });
 */
export function useUpdatePluginMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePluginMutation, UpdatePluginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePluginMutation, UpdatePluginMutationVariables>(UpdatePluginDocument, options);
      }
export type UpdatePluginMutationHookResult = ReturnType<typeof useUpdatePluginMutation>;
export type UpdatePluginMutationResult = Apollo.MutationResult<UpdatePluginMutation>;
export type UpdatePluginMutationOptions = Apollo.BaseMutationOptions<UpdatePluginMutation, UpdatePluginMutationVariables>;
export const CreatePluginDocument = gql`
    mutation CreatePlugin($file: Upload, $repo: String, $publisher: ID, $core: Boolean) {
  createPlugin(
    input: {file: $file, repo: $repo, publisher: $publisher, core: $core}
  ) {
    plugin {
      id
      name
      description
      latestVersion {
        version
      }
      images
      core
    }
  }
}
    `;
export type CreatePluginMutationFn = Apollo.MutationFunction<CreatePluginMutation, CreatePluginMutationVariables>;

/**
 * __useCreatePluginMutation__
 *
 * To run a mutation, you first call `useCreatePluginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePluginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPluginMutation, { data, loading, error }] = useCreatePluginMutation({
 *   variables: {
 *      file: // value for 'file'
 *      repo: // value for 'repo'
 *      publisher: // value for 'publisher'
 *      core: // value for 'core'
 *   },
 * });
 */
export function useCreatePluginMutation(baseOptions?: Apollo.MutationHookOptions<CreatePluginMutation, CreatePluginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePluginMutation, CreatePluginMutationVariables>(CreatePluginDocument, options);
      }
export type CreatePluginMutationHookResult = ReturnType<typeof useCreatePluginMutation>;
export type CreatePluginMutationResult = Apollo.MutationResult<CreatePluginMutation>;
export type CreatePluginMutationOptions = Apollo.BaseMutationOptions<CreatePluginMutation, CreatePluginMutationVariables>;
export const ParsePluginDocument = gql`
    mutation ParsePlugin($file: Upload, $repo: String, $core: Boolean) {
  parsePlugin(input: {file: $file, repo: $repo, core: $core}) {
    plugin {
      id
      type
      name
      author
      publisher {
        id
        name
        displayName
      }
      description
      icon
      repository
      readme
      latestVersion {
        version
      }
      core
    }
  }
}
    `;
export type ParsePluginMutationFn = Apollo.MutationFunction<ParsePluginMutation, ParsePluginMutationVariables>;

/**
 * __useParsePluginMutation__
 *
 * To run a mutation, you first call `useParsePluginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useParsePluginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [parsePluginMutation, { data, loading, error }] = useParsePluginMutation({
 *   variables: {
 *      file: // value for 'file'
 *      repo: // value for 'repo'
 *      core: // value for 'core'
 *   },
 * });
 */
export function useParsePluginMutation(baseOptions?: Apollo.MutationHookOptions<ParsePluginMutation, ParsePluginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ParsePluginMutation, ParsePluginMutationVariables>(ParsePluginDocument, options);
      }
export type ParsePluginMutationHookResult = ReturnType<typeof useParsePluginMutation>;
export type ParsePluginMutationResult = Apollo.MutationResult<ParsePluginMutation>;
export type ParsePluginMutationOptions = Apollo.BaseMutationOptions<ParsePluginMutation, ParsePluginMutationVariables>;
export const UpdatePluginVersionDocument = gql`
    mutation UpdatePluginVersion($pluginId: ID!, $version: String!, $description: String, $active: Boolean) {
  updateVersion(
    input: {pluginId: $pluginId, version: $version, description: $description, active: $active}
  ) {
    plugin {
      id
      name
      author
      publisher {
        id
        name
        displayName
      }
      description
      icon
      repository
      publishedAt
      readme
      latestVersion {
        version
        description
        downloads
        active
        createdAt
        updatedAt
        publishedAt
      }
    }
  }
}
    `;
export type UpdatePluginVersionMutationFn = Apollo.MutationFunction<UpdatePluginVersionMutation, UpdatePluginVersionMutationVariables>;

/**
 * __useUpdatePluginVersionMutation__
 *
 * To run a mutation, you first call `useUpdatePluginVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePluginVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePluginVersionMutation, { data, loading, error }] = useUpdatePluginVersionMutation({
 *   variables: {
 *      pluginId: // value for 'pluginId'
 *      version: // value for 'version'
 *      description: // value for 'description'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useUpdatePluginVersionMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePluginVersionMutation, UpdatePluginVersionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePluginVersionMutation, UpdatePluginVersionMutationVariables>(UpdatePluginVersionDocument, options);
      }
export type UpdatePluginVersionMutationHookResult = ReturnType<typeof useUpdatePluginVersionMutation>;
export type UpdatePluginVersionMutationResult = Apollo.MutationResult<UpdatePluginVersionMutation>;
export type UpdatePluginVersionMutationOptions = Apollo.BaseMutationOptions<UpdatePluginVersionMutation, UpdatePluginVersionMutationVariables>;
export const GetMeDocument = gql`
    query GetMe($first: Int!, $offset: Int) {
  me {
    id
    name
    lang
    displayName
    description
    plugins(first: $first, offset: $offset) {
      nodes {
        id
        images
        author
        like
        liked
        downloads
        name
        readme
        icon
        latestVersion {
          version
        }
        active
        updatedAt
      }
      totalCount
    }
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMeQuery(baseOptions: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const UpdateMeDocument = gql`
    mutation UpdateMe($name: String, $lang: Lang, $displayName: String, $description: String, $tel: String) {
  updateMe(
    input: {name: $name, lang: $lang, displayName: $displayName, description: $description, tel: $tel}
  ) {
    me {
      id
      name
      lang
      displayName
      description
      tel
    }
  }
}
    `;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      name: // value for 'name'
 *      lang: // value for 'lang'
 *      displayName: // value for 'displayName'
 *      description: // value for 'description'
 *      tel: // value for 'tel'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;