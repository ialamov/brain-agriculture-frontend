import styled from '@emotion/styled';
import backgroundImage from '../../assets/background_agriculture_dark.svg';


const LoginBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
`;

const Card = styled.section`
  width: 420px;
  max-width: calc(100% - px);
  min-height: 520px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 16px;

  @media (max-width: 480px) {
    padding: 24px;
    border-radius: 12px;
    min-height: 460px;
  }
`;

const Header = styled.header`
  display: grid;
  gap: 8px;
  text-align: center;

  h1 {
    font-size: 24px;
    line-height: 1.2;
    color: #1B4332; /* verde escuro */
    margin: 0;
  }
  p {
    color: #5f6b61;
    margin: 0;
  }
`;

const Form = styled.form`
  margin-top: 8px;
  display: grid;
  gap: 16px;
`;

const Actions = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 4px;
`;

const Footer = styled.footer`
  margin-top: auto;
  font-size: 12px;
  color: #7b877f;
  text-align: center;
`;

export { LoginBackground, Card, Header, Form, Actions, Footer }