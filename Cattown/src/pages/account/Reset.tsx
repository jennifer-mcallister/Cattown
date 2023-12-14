import { ChangeEvent, FormEvent, useState } from "react";
import {
  LoginContainer,
  LoginForm,
  LoginButton,
  LoginFormInput,
  LoginSmallContainer,
  LoginContainerFooter,
  LoginContainerHeader,
} from "../../components/styled/LoginStyled";
import { SmallText } from "../../components/styled/Text";
import { forgottPassword } from "../../services/userService";
import { Link } from "react-router-dom";

interface ISubmit {
  success: boolean;
  fail: boolean;
}

export const Reset = () => {
  const [mail, setMail] = useState("");
  const [submit, setSubmit] = useState<ISubmit>({
    success: false,
    fail: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await forgottPassword(mail);
      setSubmit({ ...submit, success: true, fail: false });
    } catch {
      setSubmit({ ...submit, success: false, fail: true });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmit({ ...submit, success: false, fail: false });
    const type = e.target.type;
    const value = e.target.value;

    type === "email" ? setMail(value) : "";
  };

  return (
    <LoginContainer>
      <LoginContainerHeader>
        <h1>Forgott password?</h1>
      </LoginContainerHeader>

      <LoginForm method="post" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <LoginFormInput
          type="email"
          placeholder="Email"
          name="mail"
          id="email"
          value={mail}
          required
          onChange={handleChange}
        />
        <LoginSmallContainer>
          {submit.fail && <SmallText>Account do not exists!</SmallText>}
          {submit.success && (
            <SmallText>An email has been sent to your account!</SmallText>
          )}
          <LoginButton type="submit">Send login link</LoginButton>
        </LoginSmallContainer>
      </LoginForm>
      <LoginContainerFooter>
        <Link to="/">Log in</Link>
      </LoginContainerFooter>
    </LoginContainer>
  );
};
