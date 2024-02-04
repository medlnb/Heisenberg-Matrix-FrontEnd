import { useFormik } from "formik";
import { SignupSchema } from "../../Schemas/UerSchema";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../../Hooks/useSignUp";
import "../Login/Login";

function SignUp() {
  const navigate = useNavigate();
  const { handleUserChange } = useAuthContext();

  const onSubmit = (event: any, values: any, actions: any) => {
    event.preventDefault();
    useSignUp(values.username, values.email, values.password).then(
      (data: any) => {
        if (data.err) {
          if (actions) {
            actions.setErrors({ email: data.err });
            actions.setSubmitting(false);
          }
        } else {
          handleUserChange(data);
          if (actions) actions.resetForm();
          navigate("/notes");
        }
      }
    );
  };

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: SignupSchema,
      onSubmit: (values, actions) => onSubmit(event, values, actions),
    });
  return (
    <div className="LogIn_body">
      <form className="LogIn_conatiner" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <h3>Please enter your details</h3>
        <h4>Say your name</h4>
        <div className="inputs_container">
          <input
            className="inputs"
            id="username"
            value={values.username}
            onChange={handleChange}
          />
          <p
            style={
              errors.username && touched.username
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
            className="wrong_password"
          >
            {errors.username} !
          </p>
        </div>
        <h4>Email adress</h4>
        <div className="inputs_container">
          <input
            className="inputs"
            value={values.email}
            id="email"
            onChange={handleChange}
          />
          <p
            style={
              errors.email && touched.email
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
            className="wrong_password"
          >
            {errors.email} !
          </p>
        </div>
        <h4>Password</h4>
        <div className="inputs_container">
          <input
            className="inputs"
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
          <p
            style={
              errors.password && touched.password
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
            className="wrong_password"
          >
            {errors.password} !
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={isSubmitting ? "login isSubmitting" : "login"}
        >
          Sign up
        </button>
        <button className="login_google">
          <i className="fa-brands fa-google" /> Sign up with google
        </button>
        <div className="toSignup">
          already have an account?<Link to="/welcome">Log in</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
