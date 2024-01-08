import { ChangeEvent, FormEvent, useState } from "react";
import { Form, FormInput, FormLabel } from "../../components/styled/Form";
import { HeaderSmall, TextSmall } from "../../components/styled/Text";
import { Link } from "react-router-dom";
import { IUserRegister } from "../../types/userTypes";
import {
  MenuBody,
  MenuContainer,
  MenuFooter,
  MenuHeader,
  MenuSmallContainer,
} from "../../components/styled/Menu";
import { ButtonMedium } from "../../components/styled/Button";
import { ConfirmationContainer } from "../../components/styled/Container";
import { MainContentSignUp } from "../../components/styled/LayoutStyle";
import { registerUser } from "../../services/UserService";

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
    setConfirmPassword({ ...confirmPassword, showWarning: false });

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
    <MainContentSignUp>
      <MenuContainer>
        <MenuHeader>
          <HeaderSmall>Sign up</HeaderSmall>
        </MenuHeader>
        <MenuBody>
          <Form method="post" onSubmit={handleSubmit}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={user.email}
              required
              disabled={registration.success}
              onChange={handleChange}
            />
            <FormLabel htmlFor="username">Username</FormLabel>
            <FormInput
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
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
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
            <FormInput
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
            <MenuSmallContainer>
              {registration.success && (
                <>
                  <TextSmall>Successful, you have been signed up!</TextSmall>
                </>
              )}
              {registration.fail && (
                <>
                  <TextSmall>Account already in use!</TextSmall>
                </>
              )}
              {confirmPassword.showWarning && (
                <TextSmall>Passwords dont match!</TextSmall>
              )}
              <ButtonMedium type="submit">Sign up</ButtonMedium>
            </MenuSmallContainer>
          </Form>
        </MenuBody>
        <MenuFooter>
          <Link to="/">Log in</Link>
        </MenuFooter>
      </MenuContainer>
      <ConfirmationContainer>
        <HeaderSmall> Sign up Terms</HeaderSmall>
        <TextSmall>
          By choosing to join our community by clicking 'Sign Up,' you are
          giving your consent for us to collect and store your data in our
          database. This is essential for enabling you to seamlessly log in and
          pick up where you left off in your gaming journey. Please be assured
          that we prioritize your privacy – your data will not be shared with
          any third party. Our data collection encompasses your user information
          and game progress, ensuring a personalized and uninterrupted
          experience tailored just for you.
        </TextSmall>
      </ConfirmationContainer>
    </MainContentSignUp>
  );
};
