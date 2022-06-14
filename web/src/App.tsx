import {
  BrowserRouter as Router,
  useRoutes,
  type RouteObject,
} from "react-router-dom";

import { Provider as Auth0Provider } from "@/auth";
import { Provider as GqlProvider } from "@/gql";
import { Provider as I18nProvider } from "@/i18n";

import "./App.css";

const routes: RouteObject[] = [{ path: "*", element: <h1>Hello, world.</h1> }];

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <Auth0Provider>
      <I18nProvider>
        <GqlProvider>
          <Router>
            <AppRoutes />
          </Router>
        </GqlProvider>
      </I18nProvider>
    </Auth0Provider>
  );
}

export default App;
