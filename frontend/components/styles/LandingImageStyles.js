import styled from 'styled-components';

const LandingImageStyles = styled.div`
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
    @media(max-width: 500px) {
      top: 60%
    }
  }
`;

export default LandingImageStyles;