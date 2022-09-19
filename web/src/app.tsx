import { Provider as Auth0Provider } from "@marketplace/auth";
import MarketplaceCore from "@marketplace/components/MarketplaceCore";
import { Provider as GqlProvider } from "@marketplace/gql";
import { Provider as I18nProvider } from "@marketplace/i18n";

export default function App() {
  return (
    <Auth0Provider>
      <GqlProvider>
        <I18nProvider>
          <MarketplaceCore />
        </I18nProvider>
      </GqlProvider>
    </Auth0Provider>
  );
}
