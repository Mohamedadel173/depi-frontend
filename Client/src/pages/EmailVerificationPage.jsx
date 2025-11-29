import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const IllustrationSection = () => (
    <div className="relative p-8 md:p-16 flex flex-col items-center justify-center text-center text-white bg-gray-900 h-full">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl opacity-20"></div>

        <div className="z-10 space-y-4">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Verify Your Account
            </h1>
            <p className="text-gray-400 text-lg max-w-sm mx-auto">
                One final step to unlock all the challenges in Algo Arcade!
            </p>
            <svg className="w-40 h-40 mx-auto text-purple-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                </path>
            </svg>
        </div>
    </div>
);


const VerificationForm = ({ navigate }) => {
    const location = useLocation();
    const initialEmail = location.state?.email || "";

    const [formData, setFormData] = useState({
        email: initialEmail,
        otp: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (initialEmail) {
            setMessage({
                type: "info",
                text: `An OTP has been sent to ${initialEmail}. Please check your inbox.`,
            });
        }
    }, [initialEmail]);

    const handleChange = (e) => {
        if (e.target.name === "otp") {
            const value = e.target.value.replace(/\D/g, "").slice(0, 6);
            setFormData({ ...formData, otp: value });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        try {
            const response = await fetch(
                "https://depi-backend-yfok.vercel.app/auth/verify",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.email,
                        otp: formData.otp,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: data.msg || "Verified successfully" });

                setTimeout(() => navigate("/login"), 2000);
            } else {
                setMessage({ type: "error", text: data.msg || "Invalid OTP" });
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: "error", text: "Network error. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const getMessageStyle = () => {
        if (!message) return "";
        switch (message.type) {
            case "success":
                return "bg-green-600/20 text-green-400 border-green-500";
            case "error":
                return "bg-red-600/20 text-red-400 border-red-500";
            case "info":
                return "bg-blue-600/20 text-blue-400 border-blue-500";
            default:
                return "";
        }
    };

    return (
        <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-10 space-y-7 border border-gray-700/70">

            <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Verify Email
            </h2>

            {message && (
                <div className={`p-3 rounded-lg border text-center text-sm ${getMessageStyle()}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleVerify} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">OTP Code (6 Digits)</label>
                    <input
                        type="text"
                        name="otp"
                        required
                        maxLength="6"
                        value={formData.otp}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 text-center text-xl tracking-widest"
                        placeholder="______"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || formData.otp.length !== 6}
                    className="w-full flex justify-center py-3 px-4 rounded-lg text-lg font-semibold text-white 
                    bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                    {loading ? "Verifying..." : "Verify Account"}
                </button>
            </form>

            <div className="text-center text-gray-500 text-sm">
                Didn't receive the code?
                <button
                    onClick={() => console.log("Resend OTP")}
                    className="text-purple-400 font-semibold hover:text-purple-300 ml-1"
                >
                    Resend Code
                </button>
            </div>
        </div>
    );
};


export default function EmailVerificationPage() {
    const navigate = (path) => {
        window.location.pathname = path;
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-900">
            <div className="md:w-1/2 h-64 md:h-screen">
                <IllustrationSection />
            </div>

            <div className="md:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gray-900/50">
                <VerificationForm navigate={navigate} />
            </div>
        </div>
    );
}
