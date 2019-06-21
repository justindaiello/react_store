import React from 'react';
import styled from 'styled-components';

const LandingImage = styled.div`
  margin: 0;
  max-width: 100% !important;
  left: 0;
  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    p {
      color: white;
      font-size: 5rem;
      font-weight: 600;
      word-spacing: 1rem;
    }
  }
`;


const LandingPage = (props) => (
  <LandingImage>
    <div><p>Buy. Sell. Go Adventure.</p></div>
    <img src="https://i.imgur.com/mIYX3BS.jpg" alt="home-page-photo" />
  </LandingImage>
)

export default LandingPage