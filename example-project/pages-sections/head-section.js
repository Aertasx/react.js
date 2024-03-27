import { useEffect } from "react";
import Head from "next/head";

export default function PageHead () {
  useEffect(() => {
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
  }, []);

  const commonSheetUrl = '/styles/scss/nextjs-material-kit.scss?v=1.2.0';

  return (
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>NextJS Material Kit by Creative Tim</title>
        <link rel="stylesheet" href={commonSheetUrl} />
      </Head>
  );
}