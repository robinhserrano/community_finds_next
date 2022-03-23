import "../styles/globals.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useUserData } from "../lib/hooks";
import { UserContext } from "../lib/context";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <UserContext.Provider value={userData}>
      <StoreProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </StoreProvider>
    </UserContext.Provider>
  );
}
export default MyApp;
