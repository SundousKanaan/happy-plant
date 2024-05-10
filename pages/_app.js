import { AccountProvider } from "@/src/contexts/account/accountContext";
import "@/public/styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <AccountProvider>
      <Component {...pageProps} />
    </AccountProvider>
  );
}
