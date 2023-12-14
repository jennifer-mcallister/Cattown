import { ChangeEvent, FormEvent, useState } from "react";
import {
  LoginContainer,
  LoginForm,
  LoginButton,
  LoginFormInput,
  LoginSmallContainer,
  LoginContainerFooter,
  LoginContainerHeader,
} from "../components/styled/LoginStyled";
import { login } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { SmallText } from "../components/styled/Text";
import { IUserLogin } from "../types/userTypes";

export const Login = () => {
  const navigate = useNavigate();

  const [loginFail, setLoginFail] = useState(false);
  const [user, setUser] = useState<IUserLogin>({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const loginSuccess = await login(user);
      localStorage.setItem("savefileId", loginSuccess.savefileId);
      navigate("/home");
    } catch {
      setLoginFail(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginFail(false);
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;

    type === "text" ? setUser({ ...user, [name]: value }) : "";
    type === "password" ? setUser({ ...user, [name]: value }) : "";
  };

  return (
    <>
      <LoginContainer>
        <LoginContainerHeader>
          <h1>Enter Cattown</h1>
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
            onChange={handleChange}
          />
          <LoginSmallContainer>
            <label htmlFor="password">Password</label>
            <LoginFormInput
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              minLength={8}
              maxLength={128}
              required
              onChange={handleChange}
            />
          </LoginSmallContainer>

          <LoginSmallContainer>
            {loginFail && (
              <SmallText>Incorrect username or password!</SmallText>
            )}
            <LoginButton type="submit">Log in</LoginButton>
          </LoginSmallContainer>
        </LoginForm>
        <LoginContainerFooter>
          <LoginSmallContainer>
            <Link to="/account/signup">Sign up</Link>
            <Link to="/account/reset">Forgott password?</Link>
          </LoginSmallContainer>
        </LoginContainerFooter>
      </LoginContainer>
    </>
  );
};
