import MockImage from "@marketplace/assets/mock/satellite.png";
import { graphql } from "msw";

export const handlers = [
  graphql.query("SearchPlugin", (_req, res, ctx) => {
    return res(
      ctx.data({
        plugins: {
          __typename: "Plugin",
          pageInfo: {
            startCursor: 0,
            endCursor: 100,
            hasNextPage: true,
            hasPreviousPage: false,
          },
          nodes: [
            {
              id: "1",
              name: "Satellite Plugin",
              author: "Re:Earth",
              images: [`${MockImage}`],
              like: 10,
              downloads: 100,
            },
            {
              id: "2",
              name: "Satellite Plugin2",
              author: "Re:Earth",
              images: [`${MockImage}`],
              like: 100,
              downloads: 1000,
            },
            {
              id: "3",
              name: "Satellite Plugin2",
              author: "Re:Earth",
              images: [`${MockImage}`],
              like: 100,
              downloads: 1000,
            },
            {
              id: "4",
              name: "Satellite Plugin2",
              author: "Re:Earth",
              images: [`${MockImage}`],
              like: 100,
              downloads: 1000,
            },
          ],
          totalCount: 4,
        },
      })
    );
  }),
  graphql.query("Plugin", (_req, res, ctx) => {
    return res(
      ctx.data({
        node: {
          __typename: "Plugin",
          id: "1111",
          name: "Satellite Plugin",
          author: "Re: Earth Team",
          like: 100,
          liked: true,
          description: "This is Satellite Plugin",
          readme:
            "# Satellite Plugin \n ## What is this? \n This plugin has a bunch of satellites' location data",
          downloads: 100,
          icon: null,
          latestVersion: {
            version: "v1.0.0",
          },
          images: [`${MockImage}`, `${MockImage}`],
        },
      })
    );
  }),
  graphql.query("GetMe", (_req, res, ctx) => {
    return res(
      ctx.data({
        me: {
          id: "1",
          name: "Re: Earth",
          displayName: "Re: Earth Team",
          description: "This is Re: Earth Team",
          __typename: "Me",
          plugins: {
            __typename: "Plugin",
            pageInfo: {
              startCursor: 0,
              endCursor: 100,
              hasNextPage: true,
              hasPreviousPage: false,
            },
            nodes: [
              {
                id: "1",
                name: "Satellite Plugin",
                active: true,
                publishedAt: Date.now(),
                updatedAt: Date.now(),
                latestVersion: {
                  version: "v1.0.0",
                },
                images: [`${MockImage}`, `${MockImage}`],
                author: "Re: Earth Team",
                like: 100,
                downloads: 1000,
              },
              {
                id: "2",
                name: "Satellite Plugin",
                active: true,
                publishedAt: Date.now(),
                updatedAt: Date.now(),
                latestVersion: {
                  version: "v1.0.0",
                },
                images: [`${MockImage}`, `${MockImage}`],
                author: "Re: Earth Team",
                like: 100,
                downloads: 1000,
              },
              {
                id: "3",
                name: "Satellite Plugin",
                active: true,
                publishedAt: Date.now(),
                updatedAt: Date.now(),
                latestVersion: {
                  version: "v1.0.0",
                },
                images: [`${MockImage}`, `${MockImage}`],
                author: "Re: Earth Team",
                like: 100,
                downloads: 1000,
              },
              {
                id: "4",
                name: "Satellite Plugin",
                active: true,
                publishedAt: Date.now(),
                updatedAt: Date.now(),
                latestVersion: {
                  version: "v1.0.0",
                },
                images: [`${MockImage}`, `${MockImage}`],
                author: "Re: Earth Team",
                like: 100,
                downloads: 1000,
              },
            ],
            totalCount: 4,
          },
        },
      })
    );
  }),
  graphql.mutation("CreatePlugin", (_req, res, ctx) => {
    return res(
      ctx.data({
        __typename: "Plugin",
        id: "1111",
        name: "Satellite Plugin",
        version: "v1.0.0",
        images: [],
      })
    );
  }),
  graphql.mutation("ParsePlugin", (_req, res, ctx) => {
    return res(
      ctx.data({
        parsePlugin: {
          plugin: {
            __typename: "Plugin",
            type: "REEARTH",
            author: "Re: Earth Team",
            icon: null,
            repository: null,
            readme:
              "# Satellite Plugin \n ## What is this? \n This plugin has a bunch of satellites' location data",
            id: "1111",
            name: "Satellite Plugin",
            description: "This is Satellite Plugin",
            version: "v1.0.0",
            images: [],
          },
        },
      })
    );
  }),
  graphql.mutation("UpdatePlugin", (_req, res, ctx) => {
    return res(
      ctx.data({
        updatePlugin: {
          plugin: {
            __typename: "Plugin",
            id: "1111",
            active: false,
            tags: [],
            images: [],
          },
        },
      })
    );
  }),
  graphql.mutation("LikePlugin", (_req, res, ctx) => {
    return res(
      ctx.data({
        likePlugin: {
          plugin: {
            __typename: "Plugin",
            id: "1111",
            name: "Satellite Plugin",
            liked: false,
          },
        },
      })
    );
  }),
  graphql.mutation("UnlikePlugin", (_req, res, ctx) => {
    // TODO: What is Missing field??
    return res(
      ctx.data({
        unlikePlugin: {
          plugin: {
            __typename: "Plugin",
            id: "1111",
            like: 100,
            liked: false,
          },
        },
      })
    );
  }),
  graphql.mutation("UpdatePlugin", (_req, res, ctx) => {
    return res(
      ctx.data({
        updatePlugin: {
          plugin: {
            __typename: "Plugin",
            id: "1111",
            active: false,
            tags: [],
            images: [],
          },
        },
      })
    );
  }),
  graphql.mutation("LikePlugin", (_req, res, ctx) => {
    return res(
      ctx.data({
        likePlugin: {
          plugin: {
            __typename: "Plugin",
            id: "1111",
            name: "Satellite Plugin",
            liked: false,
          },
        },
      })
    );
  }),
  graphql.mutation("UnlikePlugin", (_req, res, ctx) => {
    // TODO: What is Missing field??
    return res(
      ctx.data({
        unlikePlugin: {
          plugin: {
            __typename: "Plugin",
            id: "1111",
            like: 100,
            liked: false,
          },
        },
      })
    );
  }),
];
