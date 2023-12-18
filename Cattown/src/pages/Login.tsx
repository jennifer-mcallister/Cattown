import { ChangeEvent, FormEvent, useState } from "react";
import { Form, FormInput } from "../components/styled/Form";
import { Link, useNavigate } from "react-router-dom";
import { SmallText } from "../components/styled/Text";
import { IUserLogin } from "../types/userTypes";
import { loginUser } from "../services/Firebase";
import {
  MenuContainer,
  MenuFooter,
  MenuHeader,
  MenuSmallContainer,
} from "../components/styled/Menu";
import { ButtonMedium } from "../components/styled/Button";

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
      <MenuContainer>
        <MenuHeader>
          <h1>Enter Cattown</h1>
        </MenuHeader>
        <Form method="post" onSubmit={handleSubmit}>
          <label htmlFor="username">Email</label>
          <FormInput
            type="email"
            placeholder="email"
            name="email"
            id="email"
            value={user.email}
            required
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <FormInput
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            minLength={8}
            maxLength={128}
            required
            onChange={handleChange}
          />
          <MenuSmallContainer>
            <ButtonMedium type="submit">Log in</ButtonMedium>
          </MenuSmallContainer>
          {loginFail && <SmallText>Incorrect username or password!</SmallText>}
        </Form>
        <MenuFooter>
          <MenuSmallContainer>
            <Link to="/account/signup">Sign up</Link>
            <Link to="/account/reset">Forgott password?</Link>
          </MenuSmallContainer>
        </MenuFooter>
      </MenuContainer>
    </>
  );
};
