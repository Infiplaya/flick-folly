import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Get blazingly fast show recommendations."
          />
          <meta property="og:site_name" content="flickfolly.vercel.app" />
          <meta
            property="og:description"
            content="Get blazingly fast show recommendations."
          />
          <meta property="og:title" content="Show Recommendation Generator" />
        </Head>
        <body className="bg-neutral-900 text-slate-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
