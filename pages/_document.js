import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        {" "}
        {/* You can set the language attribute here */}
        <Head>
          {/* Here, you can include any tags that you want to consistently render in the <head> */}
          {/* Such as custom fonts or stylesheets */}
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
