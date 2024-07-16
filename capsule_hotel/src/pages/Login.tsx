import styled from "styled-components";

const LoginLayout = styled.main`
  display: grid;
  /* grid-template-columns: 48rem; */
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  min-height: 100vh;
`;

function Login() {
  return <LoginLayout>로그인</LoginLayout>;
}

export default Login;
