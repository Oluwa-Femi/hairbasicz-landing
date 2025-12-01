/* eslint-disable import/namespace */
import * as Yup from "yup";

export const signupWithEmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid  email").required("Email is required"),
});

export const signupWithPhoneNoSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .min(13, "Invalid Phone Number")
    .max(14, "Invalid Phone Number"),
});

export const forgotPasswordWithEmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid  email").required("Email is required"),
});

export const forgotPasswordWithPhoneNoSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .min(13, "Invalid Phone Number")
    .max(14, "Invalid Phone Number"),
});

export const loginWithEmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be more than 8 characters"),
});

export const loginWithPhoneNoSchema = Yup.object().shape({
  phoneNumber: Yup.number().required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be more than 8 characters"),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min("8")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const signupDetailsSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z]+$/, "Please enter a valid name"),
  lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[A-Za-z]+$/, "Please enter a valid name"),
  password: Yup.string()
    .required("Password is required")
    .min("8")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  dateOfBirth: Yup.date().required("Please select date of birth"),
});

export const inviteAdminSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z]+$/, "Please enter a valid name"),
  lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[A-Za-z]+$/, "Please enter a valid name"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});
