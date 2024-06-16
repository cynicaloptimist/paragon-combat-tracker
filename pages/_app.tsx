import "/styles/globals.css";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
