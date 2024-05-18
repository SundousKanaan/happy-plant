import { AccountProvider } from "@/src/contexts/account/accountContext";
import "@/public/styles/globals.css";
import { DialogProvider } from "@/src/contexts/dialogContext/dialogContext";
import { StapperProvider } from "@/src/contexts/tutorialStapper/tutorialStapper";

export default function MyApp({ Component, pageProps }) {
  return (
    <AccountProvider>
      <DialogProvider>
        <StapperProvider>
          <Component {...pageProps} />
        </StapperProvider>
      </DialogProvider>
    </AccountProvider>
  );
}
