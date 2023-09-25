import * as yup from "yup"

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
                      

export const SignupSchema = yup.object().shape({
  username: yup.string().min(5).required("Required"),
  
  email: yup.string().email("Please enter a valid email")
    .required("Required"),
  
  password: yup.string().min(8)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required")
})
export const LoginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email")
    .required("Required"),

  password: yup.string().min(8).required("Required")
})
