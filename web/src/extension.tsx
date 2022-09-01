// import PluginLibraryExt, {
//   type Props as PluginLibraryExtProps,
// } from "@marketplace/components/organisms/PluginLibraryExt";
// import { Provider as GqlProvider } from "@marketplace/gql";

// export type Extension = {
//   type: "plugin-library" | "plugin-installed";
//   id: string;
//   component: React.FC<any>;
// };

// const Extension =
//   (Component: React.FC<any>) =>
//   // eslint-disable-next-line react/display-name
//   ({ accessToken, ...props }: PluginLibraryExtProps) => {
//     return (
//       <GqlProvider accessToken={accessToken}>
//         <Component accessToken={accessToken} {...props} />
//       </GqlProvider>
//     );
//   };

// export default [
//   {
//     type: "plugin-library",
//     id: "marketplace",
//     component: Extension(PluginLibraryExt),
//   },
// ] as Extension[];
