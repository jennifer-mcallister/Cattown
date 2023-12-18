import { ChangeEvent, FormEvent, useState } from "react";
import { Form, FormInput } from "../../components/styled/Form";
import { SmallText } from "../../components/styled/Text";
import { Link } from "react-router-dom";
import { resetPassword } from "../../services/Firebase";
import {
  MenuContainer,
  MenuFooter,
  MenuHeader,
  MenuSmallContainer,
} from "../../components/styled/Menu";
import { ButtonMedium } from "../../components/styled/Button";

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
      await resetPassword(mail);
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
    <MenuContainer>
      <MenuHeader>
        <h1>Forgott password?</h1>
      </MenuHeader>

      <Form method="post" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <FormInput
          type="email"
          placeholder="Email"
          name="mail"
          id="email"
          value={mail}
          required
          onChange={handleChange}
        />
        <MenuSmallContainer>
          <ButtonMedium type="submit">Send login link</ButtonMedium>
          {submit.fail && <SmallText>Account do not exists!</SmallText>}
          {submit.success && (
            <SmallText>An email has been sent to your account!</SmallText>
          )}
        </MenuSmallContainer>
      </Form>
      <MenuFooter>
        <Link to="/">Log in</Link>
      </MenuFooter>
    </MenuContainer>
  );
};
