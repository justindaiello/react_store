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
`;


const LandingPage = (props) => (
  <LandingImage>
    <img src="https://i.imgur.com/mIYX3BS.jpg" alt="home-page-photo" />
  </LandingImage>
)

export default LandingPage