import "../styles/globals.css";
import "../dist/output.css";
import "react-toastify/dist/ReactToastify.css";

import { ManagerProvider } from "../utils/manager";

function MyApp({ Component, pageProps }) {
  return (
    <ManagerProvider>
      <Component {...pageProps} />
    </ManagerProvider>
  );
}

export default MyApp;
