import { FileText, Mail } from 'lucide-react';
import Lottie from "lottie-react";
import DocAnimation from "../animation/doc-animation.json";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section with Lottie Animation */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          
          <Lottie className='absolute inset-0 h-[80%] mx-auto w-[80%] object-cover opacity-80' animationData={DocAnimation} loop={true} />

          <div className="hidden lg:relative mx-auto lg:block lg:p-12">

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Forgot Your Password?
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
        </section>

        {/* Main Form Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <Link className="inline-flex items-center justify-center rounded-full bg-white text-blue-600 p-4" to={"/"}>
                <span className="sr-only">Home</span>
                <FileText className="h-8 w-8 text-blue-600" />
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Forgot Password
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Enter your email address to receive a password reset link.
              </p>
            </div>

            {/* Forgot Password Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Reset Your Password</h1>

            <form action="#" className="space-y-6">
              {/* Email */}
              <div className="form-control">
                <label htmlFor="Email" className="label">
                  <span className="label-text">
                    <Mail className="inline-block mr-2" /> Email
                  </span>
                </label>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  placeholder="Enter your email address"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="form-control">
                <button type="submit" className="btn btn-primary w-full">
                  Send Reset Link
                </button>
              </div>

              {/* Back to Login */}
              <p className="text-center text-sm">
                Remembered your password?{" "}
                <Link to={"/login"} className="link link-primary">Log in</Link>.
              </p>
            </form>

          </div>
        </main>
      </div>
    </section>
  );
};

export default ForgotPassword;
