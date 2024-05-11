import { AccountProvider } from "@/src/contexts/account/accountContext";
import "@/public/styles/globals.css";
import { DialogProvider } from "@/src/contexts/dialogContext/dialogContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AccountProvider>
      <DialogProvider>
        <Component {...pageProps} />
      </DialogProvider>
    </AccountProvider>
  );
}
