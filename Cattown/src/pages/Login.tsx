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
import { Link, useNavigate } from "react-router-dom";
import { SmallText } from "../components/styled/Text";
import { IUserLogin } from "../types/userTypes";
import { loginUser } from "../services/Firebase";

export const Login = () => {
  const navigate = useNavigate();

  const [loginFail, setLoginFail] = useState(false);
  const [user, setUser] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(user);
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

    type === "email" ? setUser({ ...user, [name]: value }) : "";
    type === "password" ? setUser({ ...user, [name]: value }) : "";
  };

  return (
    <>
      <LoginContainer>
        <LoginContainerHeader>
          <h1>Enter Cattown</h1>
        </LoginContainerHeader>
        <LoginForm method="post" onSubmit={handleSubmit}>
          <label htmlFor="username">Email</label>
          <LoginFormInput
            type="email"
            placeholder="email"
            name="email"
            id="email"
            value={user.email}
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
