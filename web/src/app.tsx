import { Provider as Auth0Provider } from "@marketplace/auth";
import MarketplaceCore from "@marketplace/components/MarketplaceCore";
import Footer from "@marketplace/components/molecules/Common/Footer";
import Header from "@marketplace/components/organisms/Common/Header";
import { Provider as GqlProvider } from "@marketplace/gql";
import { Provider as I18nProvider } from "@marketplace/i18n";

export default function App() {
  return (
    <Auth0Provider>
      <I18nProvider>
        <GqlProvider>
          <MarketplaceCore header={Header} footer={Footer} />
        </GqlProvider>
      </I18nProvider>
    </Auth0Provider>
  );
}
