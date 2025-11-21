import bcrypt from "bcryptjs"; // for hashing passwords
import jwt from "jsonwebtoken"; // for generating tokens
import { sendEmail } from "../utils/sendEmail.js"; // for sending emails
import { validationResult } from "express-validator"; // for validating requests
// models
import User from "../models/userModel.js"; // for User model
import Otp from "../models/otpModel.js"; // for OTP model

//function generate & send OTP email for verification
const verificationOpt = async (email, name) => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  await Otp.create({ email, otp: otpCode });
  await sendEmail(
    email,
    "Verify your Algo Arcade account",
    `
      <div style="font-family: Arial, sans-serif; max-width: 450px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px; background: #fdfcff;">
        <div style="text-align: center;">
          <img src="https://i.postimg.cc/pXKdzyTM/Main-Logo.png" alt="Logo" style="width: 200px; margin-bottom: 10px;">
          <h2 style="color: #370D5F; margin-bottom: 5px;">Verify Your Account</h2>
          <hr style="width: 60px; border: 2px solid #F81088; margin: 10px auto;">
        </div>

        <p style="font-size: 15px; color: #370D5F;">Hello, ${name}</p>
        <p style="font-size: 15px; color: #555;">Please use the code below to verify your Algo Arcade account:</p>

        <div style="text-align: center; margin: 25px 0;">
          <span style="display: inline-block; font-size: 24px; letter-spacing: 3px; background: #F81088; color: #fff; padding: 12px 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(248,16,136,0.3);">
            ${otpCode}
          </span>
        </div>

        <p style="font-size: 14px; color: #370D5F;">This code will expire in <b style="color:#F81088;">5 minutes</b>.</p>

        <div style="text-align: center; margin-top: 25px;">
          <a href="#" style="background: #38E0F8; color: #370D5F; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; display: inline-block;">Go to Algo Arcade</a>
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;">
        <p style="font-size: 13px; color: #999; text-align: center;">© 2025 <span style="color: #370D5F; font-weight: bold;">Algo Arcade</span>. All rights reserved.</p>
      </div>
    `,
    true
  );
};
//function generate & send OTP email for password reset
const passwordResetOtp = async (email, name) => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  await Otp.create({ email, otp: otpCode });
  await sendEmail(
    email,
    "Reset your Algo Arcade password",
    `
      <div style="font-family: Arial, sans-serif; max-width: 450px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px; background: #fdfcff;">
        <div style="text-align: center;">
          <img src="https://i.postimg.cc/pXKdzyTM/Main-Logo.png" alt="Logo" style="width: 200px; margin-bottom: 10px;">
          <h2 style="color: #370D5F; margin-bottom: 5px;">Reset Your Password</h2>
          <hr style="width: 60px; border: 2px solid #F81088; margin: 10px auto;">
        </div>

        <p style="font-size: 15px; color: #370D5F;">Hello, ${name}</p>
        <p style="font-size: 15px; color: #555;">We received a request to reset your password for your Algo Arcade account.</p>
        <p style="font-size: 15px; color: #555;">Use the code below to reset your password:</p>

        <div style="text-align: center; margin: 25px 0;">
          <span style="display: inline-block; font-size: 24px; letter-spacing: 3px; background: #F81088; color: #fff; padding: 12px 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(248,16,136,0.3);">
            ${otpCode}
          </span>
        </div>

        <p style="font-size: 14px; color: #370D5F;">This code will expire in <b style="color:#F81088;">5 minutes</b>.</p>
        <p style="font-size: 14px; color: #555;">If you didn’t request a password reset, please ignore this email — your account is safe.</p>

        <div style="text-align: center; margin-top: 25px;">
          <a href="#" style="background: #38E0F8; color: #370D5F; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; display: inline-block;">Go to Algo Arcade</a>
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;">
        <p style="font-size: 13px; color: #999; text-align: center;">© 2025 <span style="color: #370D5F; font-weight: bold;">Algo Arcade</span>. All rights reserved.</p>
      </div>
    `,
    true
  );
};

// Register (manual)
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, username, email, password, birthday, gender, mobile, isVerified, role } =
      req.body;
    // check if user exists by email or username
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
    // create new user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      birthday,
      gender,
      mobile,
      isVerified,
      role
    });

    // OTP generation and email sending
    verificationOpt(email, name);

    res
      .status(201)
      .json({ message: "User registered. Please verify your email.", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login (manual)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Invalid email or password" });

    // check passwords
    // const hashedPassword = await bcrypt.hash(password, 10); // hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // check if email is verified
    if (!user.isVerified) {
      await Otp.deleteMany({ email }); // delete existing OTP
      verificationOpt(email, user.name);
      return res.status(403).json({
        message:
          "Account not verified. A new verification code has been sent to your email",
      });
    }

    // generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // remove existing OTPs
    await Otp.deleteMany({ email });

    // generate & send new OTP
    passwordResetOtp(email, user.name);

    res.status(200).json({
      message: "Password reset code sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // check if OTP is expired or invalid
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update user's password
    await User.updateOne({ email }, { password: hashedPassword });

    // delete used OTPs
    await Otp.deleteMany({ email });

    res.status(200).json({ message: "Password reset successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify 
export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    await User.updateOne({ email }, { isVerified: true });
    await Otp.deleteMany({ email });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};