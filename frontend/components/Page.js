import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from './Header';
import Meta from './Meta';


//Need to be strings b/c this is not CSS
const theme = {
  lightBlue: '#99C0D1',
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  boxShadow: '0 12px 24px 0 rgba(0,0,0,.09)' 
}

const StyledPage = styled.div`
  background: white;
  /* background-image: url('https://i.imgur.com/cLWDjgQ.jpg');
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

// inject global css
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
  html {
    box-sizing: border-box;
    /* make font base 10 */
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Lato', sans-serif;
  }

  a {
    text-decoration: none;
    color: ${theme.black};
  }

`

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>
            {this.props.children}
          </Inner> 
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page;
