import { useState } from "react";
// import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const navigate = useNavigate();
  // const alert = useAlert();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    // alert.success("Successfully signed in");
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      // alert.success("Successfully signed in");
      navigate("/");
      resetFormFields();
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case "auth/user-not-found":
          alert.error("User not found");
          break;
        case "auth/wrong-password":
          alert.error("Password is incorrect");
          break;
        case "auth/too-many-requests":
          alert.error(
            "Access to this account has been temporarily disabled due to many failed login attempts"
          );
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
    <div className="sign-in-container">
      <h1>Welcome Back!</h1>
      <h2>Sign in with email & password</h2>
      <form className="form" onSubmit={handleSubmit}>
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
        <div>
          <br></br>
          <Button buttonType="normal" type="submit">
            Sign In
          </Button>
          <br></br>
          <br></br>
          <h2>Sign in with Google</h2>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
