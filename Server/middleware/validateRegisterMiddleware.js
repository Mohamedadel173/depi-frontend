import { body } from "express-validator";
import { isValidPhoneNumber } from "libphonenumber-js";

export const validateRegister = [
  // Name
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  // Username
  body("username")
    .matches(/^[a-z0-9_]{3,20}$/)
    .withMessage("Username must be 3-20 characters long and contain only lowercase letters, numbers, or _"),

  // Email
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),

  // Password
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("Password must have 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol"),

  // Birthday
  body("birthday")
    .isDate()
    .withMessage("Invalid date format (expected: YYYY-MM-DD)"),

  // Gender
  body("gender")
    .isIn(["male", "female"])
    .withMessage("Gender must be 'male' or 'female'"),

  // Mobile
  body("mobile")
    .custom((value) => {
      if (!isValidPhoneNumber(value)) {
        throw new Error("Invalid international phone number");
      }
      return true;
    }),
];
