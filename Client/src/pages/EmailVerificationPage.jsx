import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const IllustrationSection = () => (
  <div className="relative p-8 md:p-16 flex flex-col items-center justify-center text-center text-white bg-gray-900 h-full">
    <div className="absolute top-1/4 right-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl opacity-20"></div>
    <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl opacity-20"></div>

    <div className="z-10 space-y-4">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Verify Your Account
      </h1>
      <p className="text-gray-400 text-lg max-w-sm mx-auto">
        Enter the OTP sent to your email to unlock all the challenges in Algo Arcade!
      </p>
      <svg
        className="w-40 h-40 mx-auto text-purple-500/70"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </div>
  </div>
);

const VerificationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (initialEmail) {
      setMessage(`An OTP has been sent to ${initialEmail}. Please check your inbox.`);
    }
  }, [initialEmail]);

  const handleVerify = async () => {
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }
    setLoading(true);
    setMessage("");

        try {
            // Debug: log payload we're about to send
            const payload = { email: initialEmail, otp: otp };
            console.log("[verify] Sending payload:", payload);
            const response = await fetch(
                "https://depi-backend-yfok.vercel.app/auth/verify",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

      let data;
      try {
        data = await response.json();
      } catch (e) {
        const text = await response.text();
        console.warn('[verify] response is not JSON:', text);
        data = { raw: text };
      }

      console.log('[verify] response status:', response.status, 'body:', data);

      // More permissive verification check to handle different backend shapes
      const serverMsg = data && (data.msg || data.error || data.message);
      const isVerified = !!(
        (data && (data.ok || data.success || data.verified)) ||
        (typeof serverMsg === 'string' && /verified|success/i.test(serverMsg))
      );

      if (isVerified) {
        setMessage("Your account has been verified successfully! ✅");
        // Redirect to Login after short delay
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(serverMsg || "Invalid or expired OTP ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error. Please try again ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-10 space-y-7 border border-gray-700/70">
      <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Verify Email
      </h2>
      {message && <p className="text-gray-300 text-center">{message}</p>}

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter your OTP"
        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={handleVerify}
        disabled={loading || !otp}
        className="w-full mt-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify Account"}
      </button>
    </div>
  );
};

export default function EmailVerificationPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900">
      <div className="md:w-1/2 h-64 md:h-screen">
        <IllustrationSection />
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gray-900/50">
        <VerificationForm />
      </div>
    </div>
  );
}
