import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://cdn.jsdelivr.net/npm/lbh-frontend@3.5.3/dist/lbh-frontend-3.5.3.min.js" />
        </Head>
        <body className="js-enabled">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
