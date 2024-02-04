import { FormikHelpers, useFormik } from "formik";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../Hooks/useLogin";
import { LoginSchema } from "../../Schemas/UerSchema";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { handleUserChange } = useAuthContext();

  const onSubmit = (
    event: Event | undefined,
    values: { email: string; password: string },
    actions: FormikHelpers<{ email: string; password: string }>
  ) => {
    if (event) event.preventDefault();
    useLogin(values.email, values.password).then((data: any) => {
      if (data.email_err) {
        if (actions) {
          actions.setErrors({ email: data.email_err });
          actions.setSubmitting(false);
        }
      } else if (data.pw_err) {
        if (actions) {
          actions.setErrors({ password: data.pw_err });
          actions.setSubmitting(false);
        }
      } else {
        handleUserChange(data);
        if (actions) actions.resetForm();
        navigate("/notes");
      }
    });
  };

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: (values, actions) => onSubmit(event, values, actions),
    });

  return (
    <div className="LogIn_body">
      <form className="LogIn_conatiner" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <h3>Please enter your details</h3>

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
          Log in
        </button>
        <button className="login_google">
          <i className="fa-brands fa-google" /> Log in with google
        </button>
        <div className="toSignup">
          don't have an account?
          <Link to="/welcome/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
