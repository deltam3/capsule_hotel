import styled from "styled-components";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import LoginForm from "../features/authentication/LoginForm";

const LoginLayout = styled.main`
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  min-height: 100vh;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">로그인</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
