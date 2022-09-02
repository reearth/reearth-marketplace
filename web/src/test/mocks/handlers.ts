import { graphql } from "msw";

export const handlers = [
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
      }),
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
      }),
    );
  }),
];
