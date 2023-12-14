import { ChangeEvent, FormEvent, useState } from "react";
import {
  LoginContainer,
  LoginForm,
  LoginButton,
  LoginFormInput,
  LoginContainerHeader,
  LoginContainerFooter,
  LoginSmallContainer,
} from "../../components/styled/LoginStyled";
import { IUserSubmitNewPassword } from "../../types/User";
import { submitNewPassword } from "../../services/userService";
import { Link, useParams } from "react-router-dom";
import { SmallText } from "../../components/styled/Text";

interface ISubmit {
  success: boolean;
  fail: boolean;
}

export const NewPassword = () => {
  const params = useParams();

  const [confirmPassword, setConfirmPassword] = useState({
    password: "",
    showWarning: false,
  });
  const [submit, setSubmit] = useState<ISubmit>({
    success: false,
    fail: false,
  });
  const [user, setUser] = useState<IUserSubmitNewPassword>({
    username: "",
    password: "",
    userId: params.userId || "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (user.password !== confirmPassword.password) {
      setConfirmPassword({ ...confirmPassword, showWarning: true });
      return;
    }

    try {
      await submitNewPassword(user);
      setSubmit({ ...submit, success: true, fail: false });
    } catch {
      setSubmit({ ...submit, success: false, fail: true });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmit({ ...submit, success: false, fail: false });
    setConfirmPassword({ ...confirmPassword, showWarning: false });

    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;

    type === "text" ? setUser({ ...user, [name]: value }) : "";
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
    <LoginContainer>
      <LoginContainerHeader>
        <h1>Select new password</h1>
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
          disabled={submit.success}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <LoginFormInput
          type="password"
          placeholder="New Password"
          name="password"
          id="password"
          value={user.password}
          minLength={8}
          maxLength={128}
          required
          disabled={submit.success}
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
          disabled={submit.success}
          onChange={handleChange}
        />
        <LoginSmallContainer>
          {submit.fail && <SmallText>Incorrect username</SmallText>}
          {confirmPassword.showWarning && (
            <SmallText>Passwords dont match</SmallText>
          )}
          {submit.success && (
            <>
              <SmallText>Success, you have a new password!</SmallText>
            </>
          )}
          <LoginButton type="submit">Submit</LoginButton>
        </LoginSmallContainer>
      </LoginForm>
      <LoginContainerFooter>
        <Link to="/">Log in</Link>
      </LoginContainerFooter>
    </LoginContainer>
  );
};
