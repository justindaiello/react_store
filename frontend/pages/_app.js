//Next.js wraps everything in an App component this is a custom app. Component will be any of our files in pages folder. Wraps the whole app in this component
import App, { Container } from 'next/app';
import Page from '../components/Page';

class MyApp extends App {
  render() {
    const { Component } = this.props

    return(
        <Container>
          <Page>
            <Component />
          </Page>
        </Container>
    )
  }
}

export default MyApp
