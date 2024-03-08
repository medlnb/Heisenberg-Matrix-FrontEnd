import { useFormik } from "formik";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../Hooks/useLogin";
import { LoginSchema } from "../../Schemas/UerSchema";
import "./Login.css";
import { notify } from "../../App";

function Login() {
  const navigate = useNavigate();
  const { handleUserChange } = useAuthContext();
  const {
    errors,
    getFieldProps,
    touched,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      useLogin(values.email, values.password).then((data: any) => {
        if (!data.username) {
          setSubmitting(false);
          return notify("error", data);
        }
        handleUserChange(data);
        navigate("/notes");
      });
    },
  });
  return (
    <div className="LogIn_body">
      <form className="LogIn_conatiner" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <h3>Please enter your details</h3>

        <h4>Email adress</h4>
        <div className="inputs_container">
          <input className="inputs" id="email" {...getFieldProps("email")} />
          <p
            style={
              touched.email && errors.email
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
            {...getFieldProps("password")}
          />
          <p
            style={
              touched.password && errors.password
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
