import { Provider } from "react-redux";
import store from "../store";
import Layout from "../components/layout/LayoutOld";
import "../styles/globals.css";
import checkAuth from "../components/utils/checkAuth";
import SiteLayout from "../components/layout/SiteLayout";

function MyApp({ Component, pageProps }) {
  // const { isAuthCheckedForInit, isAuth } = checkAuth(); // Auth kontrolü ve durumunu alıyoruz

  // if (!isAuthCheckedForInit) {
  //   // Eğer auth kontrolü henüz tamamlanmamışsa burada bir yükleme gösterebiliriz
  //   return;
  // }

  // return (
  //   <Provider store={store}>
  //     {isAuth ? (
  //       <AdminLayout>
  //         <Component {...pageProps} />
  //       </AdminLayout>
  //     ) : (
  //       <Layout>
  //         <Component {...pageProps} />
  //       </Layout>
  //     )}
  //   </Provider>
  // );

  return (
    <Provider store={store}>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </Provider>
  );
}

export default MyApp;
