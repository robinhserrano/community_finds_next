import "../styles/globals.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useUserData } from "../lib/hooks";
import { UserContext } from "../lib/context";
import { StoreProvider } from "../utils/Store";
import { loadPosts } from "../components/refresh";

export async function getStaticProps() {
  // Instead of fetching your /api route you can call the same
  // function directly in getStaticProps
  loadPosts();
}

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    const id = setInterval(() => {
      loadPosts();
    }, 15000);
    return () => clearInterval(id);
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
