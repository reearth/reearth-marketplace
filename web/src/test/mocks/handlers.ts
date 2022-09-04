import { graphql } from "msw";
import MockImage from "@marketplace/assets/mock/satellite.png";

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
  graphql.mutation("CreatePlugin", (_req, res, ctx) => {
    return res(
      ctx.data({
        me: {
          __typename: "Plugin",
          id: "1111",
          name: "Satellite Plugin",
          description: "This is Satellite Plugin",
          version: "v1.0.0",
          images: [],
        },
      })
    );
  }),
  graphql.mutation("ParsePlugin", (_req, res, ctx) => {
    return res(
      ctx.data({
        __typename: "Plugin",
        id: "1111",
        name: "Satellite Plugin",
        description: "This is Satellite Plugin",
        version: "v1.0.0",
        images: [],
      })
    );
  }),
];
