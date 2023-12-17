import { ChangeEvent, FormEvent, useState } from "react";
import {
  LoginForm,
  LoginButton,
  LoginFormInput,
  LoginSmallContainer,
  LoginContainerHeader,
  LoginContainerFooter,
  SignUpContainer,
  SignUpTermsContainer,
} from "../../components/styled/LoginStyled";
import { SmallText } from "../../components/styled/Text";
import { Link } from "react-router-dom";
import { IUserRegister } from "../../types/userTypes";
import { registerUser } from "../../services/Firebase";

interface IRegistraion {
  success: boolean;
  fail: boolean;
}

export const SignUp = () => {
  const [confirmPassword, setConfirmPassword] = useState({
    password: "",
    showWarning: false,
  });
  const [registration, setRegistration] = useState<IRegistraion>({
    success: false,
    fail: false,
  });
  const [user, setUser] = useState<IUserRegister>({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (user.password !== confirmPassword.password) {
      setConfirmPassword({ ...confirmPassword, showWarning: true });
      return;
    }

    try {
      await registerUser(user);
      setRegistration({ ...registration, success: true, fail: false });
    } catch {
      setRegistration({ ...registration, success: false, fail: true });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegistration({ ...registration, success: false, fail: false });
    setConfirmPassword({ ...confirmPassword, showWarning: false });

    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;

    type === "text" ? setUser({ ...user, [name]: value }) : "";
    type === "email" ? setUser({ ...user, [name]: value }) : "";

    if (name === "password") {
      type === "password" ? setUser({ ...user, [name]: value }) : "";
    }
    if (name === "confirmPassword") {
      type === "password"
        ? setConfirmPassword({ ...confirmPassword, password: value })
        : "";
    }
  };

  return (
    <SignUpContainer>
      <LoginContainerHeader>
        <h1>Sign up</h1>
      </LoginContainerHeader>
      <LoginForm method="post" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <LoginFormInput
          type="text"
          placeholder="Username"
          name="username"
          id="username"
          value={user.username}
          minLength={3}
          maxLength={30}
          required
          disabled={registration.success}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <LoginFormInput
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          value={user.email}
          required
          disabled={registration.success}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <LoginFormInput
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={user.password}
          minLength={8}
          maxLength={128}
          required
          disabled={registration.success}
          onChange={handleChange}
        />
        <LoginFormInput
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword.password}
          minLength={8}
          maxLength={128}
          required
          disabled={registration.success}
          onChange={handleChange}
        />
        <LoginSmallContainer>
          {registration.success && (
            <>
              <SmallText>Successful, you have been signed up!</SmallText>
            </>
          )}
          {registration.fail && (
            <>
              <SmallText>Account already in use!</SmallText>
            </>
          )}
          {confirmPassword.showWarning && (
            <SmallText>Passwords dont match!</SmallText>
          )}
          <LoginButton type="submit">Sign up</LoginButton>
        </LoginSmallContainer>
      </LoginForm>
      <SignUpTermsContainer>
        <SmallText>
          By choosing to join our community by clicking 'Sign Up,' you are
          giving your consent for us to collect and store your data in our
          database. This is essential for enabling you to seamlessly log in and
          pick up where you left off in your gaming journey. Please be assured
          that we prioritize your privacy – your data will not be shared with
          any third party. Our data collection encompasses your user information
          and game progress, ensuring a personalized and uninterrupted
          experience tailored just for you.
        </SmallText>
      </SignUpTermsContainer>
      <LoginContainerFooter>
        <LoginSmallContainer>
          <Link to="/">Log in</Link>
        </LoginSmallContainer>
      </LoginContainerFooter>
    </SignUpContainer>
  );
};
