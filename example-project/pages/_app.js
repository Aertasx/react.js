import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store";
import SiteLayout from "../components/layout/SiteLayout";
import { useRouter } from "next/router";
import { BACK_BASE_URL } from "../config/urlConfig";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const { pathname } = router;
  const isAdmin = pathname.startsWith("/admin");
  const [isMaterialKitLoaded, setIsMaterialKitLoaded] = useState(false);
  const [isAntDesignLoaded, setIsAntDesignLoaded] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      import("/styles/scss/nextjs-material-kit.scss?v=1.2.0")
        .then(() => setIsMaterialKitLoaded(true))
        .catch((error) =>
          console.error("Error loading Material Kit SCSS:", error)
        );

      let comment = document.createComment(`
        =========================================================
        * NextJS Material Kit v1.2.2 based on Material Kit Free - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit React v1.8.0
        =========================================================
        
        * Product Page: https://www.creative-tim.com/product/nextjs-material-kit
        * Copyright 2023 Creative Tim (https://www.creative-tim.com)
        * Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/main/LICENSE.md)
        
        * Coded by Creative Tim
        
        =========================================================
        
        * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
        `);
      document.insertBefore(comment, document.documentElement);
    } else {
      import("/styles/css/antDesignGlobals.css")
        .then(() => setIsAntDesignLoaded(true))
        .catch((error) =>
          console.error("Error loading Material Kit SCSS:", error)
        );
    }
  }, [isAdmin]);

  return (
    <Provider store={store}>
        {/* Conditional rendering based on isAdmin */}
        {isAdmin ? (
          isAntDesignLoaded ? (
            <SiteLayout back_base_url={BACK_BASE_URL}>
              <Component {...pageProps} />
            </SiteLayout>
          ) : (
            <div>Loading Ant Design...</div>
          )
        ) : isMaterialKitLoaded ? (
          <>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              <title>NextJS Material Kit by Creative Tim</title>
              <meta charSet="utf-8" />
              <meta name="theme-color" content="#000000" />
              <link rel="shortcut icon" href="/img/favicon.png" />
              <link
                rel="apple-touch-icon"
                sizes="76x76"
                href="/img/apple-icon.png"
              />
              {/* Fonts and icons */}
              <link
                rel="stylesheet"
                type="text/css"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
              />
              <link
                href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
                rel="stylesheet"
              />
              {/* <!-- Nepcha Analytics (nepcha.com) -->
        <!-- Nepcha is a easy-to-use web analytics. No cookies and fully compliant with GDPR, CCPA and PECR. --> */}
              <script
                defer
                data-site="YOUR_DOMAIN_HERE"
                src="https://api.nepcha.com/js/nepcha-analytics.js"
              ></script>
            </Head>
            <Component {...pageProps} />
          </>
        ) : (
          <div>Loading Material Kit...</div>
        )}
    </Provider>
  );
};

export default MyApp;
