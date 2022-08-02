import { graphql } from "msw";

export const handlers = [
  graphql.query("Me", (_req, res, ctx) => {
    return res(
      ctx.data({
        me: {
          __typename: "Me",
          id: "xxx",
          name: "Name",
        },
      }),
    );
  }),
  graphql.mutation("UpdateMe", (_req, res, ctx) => {
    return res(
      ctx.data({
        me: {
          __typename: "Me",
          id: "xxx",
          name: "Name",
        },
      }),
    );
  }),
];
