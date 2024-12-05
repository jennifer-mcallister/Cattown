// import { ChangeEvent, FormEvent, useState } from "react";
// import { Form, FormInput, FormLabel } from "../components/styled/Form";
// import { Link, useNavigate } from "react-router-dom";
// import { HeaderSmall, TextSmall } from "../components/styled/Text";
// import { IUserLogin } from "../types/userTypes";
// import {
//   MenuContainer,
//   MenuFooter,
//   MenuHeader,
//   MenuSmallContainer,
// } from "../components/styled/Menu";
// import { ButtonMedium } from "../components/styled/Button";
// import { loginUser } from "../services/UserService";

// export const Login = () => {
//   const navigate = useNavigate();

//   const [loginFail, setLoginFail] = useState(false);
//   const [user, setUser] = useState<IUserLogin>({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       await loginUser(user);
//       navigate("/");
//     } catch {
//       setLoginFail(true);
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setLoginFail(false);
//     const name = e.target.name;
//     const type = e.target.type;
//     const value = e.target.value;

//     type === "email" ? setUser({ ...user, [name]: value }) : "";
//     type === "password" ? setUser({ ...user, [name]: value }) : "";
//   };

//   return (
//     <>
//       <MenuContainer>
//         <MenuHeader>
//           <HeaderSmall>Welcome to Cattown</HeaderSmall>
//         </MenuHeader>
//         <Form method="post" onSubmit={handleSubmit}>
//           <FormLabel htmlFor="email">Email</FormLabel>
//           <FormInput
//             type="email"
//             placeholder="email"
//             name="email"
//             id="email"
//             autoComplete="email"
//             value={user.email}
//             required
//             onChange={handleChange}
//           />

//           <FormLabel htmlFor="password">Password</FormLabel>
//           <FormInput
//             type="password"
//             placeholder="Password"
//             name="password"
//             id="password"
//             autoComplete="current-password"
//             value={user.password}
//             minLength={8}
//             maxLength={128}
//             required
//             onChange={handleChange}
//           />
//           <MenuSmallContainer>
//             <ButtonMedium type="submit">Log in</ButtonMedium>
//           </MenuSmallContainer>
//           {loginFail && <TextSmall>Incorrect username or password!</TextSmall>}
//         </Form>
//         <MenuFooter>
//           <MenuSmallContainer>
//             <Link to="/account/signup">Sign up</Link>
//             <Link to="/account/reset">Forgott password?</Link>
//           </MenuSmallContainer>
//         </MenuFooter>
//       </MenuContainer>
//     </>
//   );
// };
