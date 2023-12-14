import { styled } from "styled-components";

export const LoginContainer = styled.div`
  width: 28rem;
  height: 45rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  border-radius: 0.5rem;
  background: lightgrey;
`;

export const SignUpContainer = styled(LoginContainer)`
  height: 55rem;
`;

export const LoginContainerHeader = styled.div`
  height: 3rem;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

export const LoginContainerFooter = styled(LoginContainerHeader)`
  align-items: flex-end;
`;

export const LoginForm = styled.form`
  width: 20rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  gap: 1rem;
`;

export const LoginFormInput = styled.input`
  width: 18rem;
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
`;

export const LoginButton = styled.button`
  min-width: 6rem;
  height: 3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

export const LoginSmallContainer = styled.div`
  width: 20rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  align-items: center;
  min-height: 3rem;
`;

export const SignUpTermsContainer = styled(LoginSmallContainer)`
  height: 12rem;
`;
