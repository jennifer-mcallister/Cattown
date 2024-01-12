import { ChangeEvent, FormEvent, useState } from "react";
import { Form, FormInput, FormLabel } from "../components/styled/Form";
import { HeaderSmall, TextSmall } from "../components/styled/Text";
import { Link } from "react-router-dom";
import {
  MenuContainer,
  MenuFooter,
  MenuHeader,
  MenuSmallContainer,
} from "../components/styled/Menu";
import { ButtonLarge } from "../components/styled/Button";
import { resetPassword } from "../services/UserService";

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
        <HeaderSmall>Forgott password?</HeaderSmall>
      </MenuHeader>

      <Form method="post" onSubmit={handleSubmit}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput
          type="email"
          placeholder="Email"
          name="mail"
          id="email"
          autoComplete="email"
          value={mail}
          required
          onChange={handleChange}
        />
        <MenuSmallContainer>
          <ButtonLarge type="submit">Send login link</ButtonLarge>
          {submit.fail && <TextSmall>Account do not exists!</TextSmall>}
          {submit.success && (
            <TextSmall>
              An email has been sent to your account, remember to check your
              junk folder!
            </TextSmall>
          )}
        </MenuSmallContainer>
      </Form>
      <MenuFooter>
        <Link to="/">Log in</Link>
      </MenuFooter>
    </MenuContainer>
  );
};
