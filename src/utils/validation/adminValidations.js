import * as Yup from "yup";

export const AdminloginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be more than 8 characters"),
});

export const getStartedSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  newPassword: Yup.string()
    .min("8")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid  email").required("Email is required"),
});

export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min("8")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
