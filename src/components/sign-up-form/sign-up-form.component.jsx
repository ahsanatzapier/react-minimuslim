import { useState } from "react";
// import { useAlert } from "react-alert";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

const SignUpForm = () => {
  // const alert = useAlert();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmedPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmedPassword) {
      // alert("Password does not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      alert.success("Successfully created account & signed in");
      resetFormFields();
    } catch (error) {
      console.log(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          // alert.error("Email already in use");
          break;
        case "auth/weak-password":
          // alert.error("Password should be at least 6 characters");
          break;
        default:
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h1>I'm new here!</h1>
      <h2>Sign up with email & password</h2>
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmedPassword"
          value={confirmedPassword}
        />
        <br></br>
        <Button buttonType="normal" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};
export default SignUpForm;
