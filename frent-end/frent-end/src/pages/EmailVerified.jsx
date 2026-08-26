import { Link } from "react-router-dom";

const EmailVerified = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
                
                <div className="text-green-500 text-5xl mb-4">
                    ✓
                </div>

                <h1 className="text-2xl font-bold mb-3">
                    Email Verified!
                </h1>

                <p className="text-gray-600 mb-6">
                    Your email has been successfully verified.
                    You can now log in to your account.
                </p>

                <Link
                    to="/login"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Go to Login
                </Link>

            </div>
        </div>
    );
};

export default EmailVerified;