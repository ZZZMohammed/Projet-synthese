import { Link } from "react-router-dom";

const VerifyEmail = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">

                <div className="text-5xl mb-4">
                    📧
                </div>

                <h1 className="text-2xl font-bold mb-3">
                    Check your email
                </h1>

                <p className="text-gray-600 mb-6">
                    We've sent a verification link to your email address.
                    Please check your inbox and click the link to verify
                    your account.
                </p>

                <p className="text-sm text-gray-500 mb-6">
                    Don't forget to check your spam folder.
                </p>

                <Link
                    to="/login"
                    className="text-blue-600 hover:underline"
                >
                    Go to Login
                </Link>

            </div>
        </div>
    );
};

export default VerifyEmail;