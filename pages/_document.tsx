import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || 'ar' };
  }

  render = () => (
    <Html
      dir={this.props.locale === 'ar' ? 'rtl' : 'ltr'}
      lang={this.props.locale}
    >
      <Head>
        <link rel="icon" href="/D.ico" />
      </Head>
      <body className="body" dir={this.props.locale === 'ar' ? 'rtl' : 'ltr'}>
        <>
          <Main />
          <NextScript />
        </>
      </body>
    </Html>
  );
}

export default MyDocument;
