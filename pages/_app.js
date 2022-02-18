import "../styles/globals.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useUserData } from "../lib/hooks";
import { UserContext } from "../lib/context";

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
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserContext.Provider>
  );
}
export default MyApp;
