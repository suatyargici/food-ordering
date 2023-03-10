import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import Layout from "../layout/Layout";
import Router from "next/router";
import NProgress from "nprogress";
import store from "../redux/store";

import { SessionProvider } from "next-auth/react";
import Toastify from "../components/Toastify";
import { Provider } from "react-redux";

import "../styles/globals.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";


Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Toastify />
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
