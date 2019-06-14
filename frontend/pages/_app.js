//Next.js wraps everything in an App component this is a custom app. Component will be any of our files in pages folder. Wraps the whole app in this component
import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData'

//App is wrapped in an apollo provider + client to expose the apollo client.

class MyApp extends App {
  //enable access to page numbers from next.js. Next.js allows getInitial props to run before the inital render which allows you to destructure pageProps within the render. Args HAVE to be ctx for this to work.
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      //search entire page for queries and/or mutations that need to be fetched and return the data
      pageProps = await Component.getInitialProps(ctx);
    }
    //make the query available to the user via props in render
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props

    return(
        <Container>
          <ApolloProvider client={apollo}>
            <Page>
              <Component {...pageProps}/>
            </Page>
          </ApolloProvider>  
        </Container>
    )
  }
}

export default withData(MyApp); //wrapping MyApp inside withdata makes everything accessable
