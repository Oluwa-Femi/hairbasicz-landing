import * as Yup from "yup";

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string()
    .min("8")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

export const AddBVNSchema = Yup.object().shape({
  bvn: Yup.string()
    .required("BVN is required")
    .min(11)
    .max(11)
    .matches(/^[0-9]*$/, "BVN must be a number"),
});

export const AddEMailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address is required.")
    .email("Inputs must be a valid email address.")

})

export const AddPhoneSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone number is required")
    .min(13, "Phone number must be valid")
    .max(14, "Phone number must be valid"),

})

export const AddBankAccountSchema = Yup.object().shape({
  accountNumber: Yup.string()
    .required("Account number is required")
    .min(10, "Account number must be 10 numbers")
    .max(10, "Account number must be 10 numbers")
    .matches(/^[0-9]*$/, "Account number must be a number"),
});

export const NextKinSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "Your name should be more than 2 letters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Your name should be more than 2 letters"),
  email: Yup.string()
    .required("email is required")
    .email("Should be a valid email"),
  phone: Yup.string()
    .required("Phone number is required")
    .min(13, "Phone number must be valid")
    .max(14, "Phone number must be valid"),
  address: Yup.string()
    .required("Address is required")
    .min(4, "Minimal of four characters are required"),
});
