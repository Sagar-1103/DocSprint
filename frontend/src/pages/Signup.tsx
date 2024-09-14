import { FileText, Mail, Lock, User, ImagePlus } from 'lucide-react';
import Lottie from "lottie-react";
import DocAnimation from "../animation/doc-animation.json";
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 ">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          
          <Lottie className='absolute inset-0 h-[80%] mx-auto w-[80%] object-cover opacity-80' animationData={DocAnimation} loop={true} />

          <div className="hidden lg:relative mx-auto lg:block lg:p-12">

            <h2 className="mt-6 text-2xl font-bold  text-white sm:text-3xl md:text-4xl">
              Welcome to DocSprint
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Effortlessly create, edit, and share documents online with our simple and intuitive platform.
            </p>
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-white text-blue-600 p-4"
                to={"/"}
              >
                <span className="sr-only">Home</span>
                <FileText className="h-8 w-8 text-blue-600" />
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Docs Clone
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Create, edit, and share documents from anywhere, anytime.
              </p>
            </div>

            {/* Signup Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Sign Up</h1>

            <form action="#" className="space-y-6">
              {/* Username */}
              <div className="form-control">
                <label htmlFor="Username" className="label">
                  <span className="label-text">
                    <User className="inline-block mr-2" /> Username
                  </span>
                </label>
                <input
                  type="text"
                  id="Username"
                  name="username"
                  placeholder="Enter your username"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Full Name */}
              <div className="form-control">
                <label htmlFor="FullName" className="label">
                  <span className="label-text">
                    <User className="inline-block mr-2" /> Full Name
                  </span>
                </label>
                <input
                  type="text"
                  id="FullName"
                  name="full_name"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

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
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Avatar */}
              <div className="form-control">
                <label htmlFor="Avatar" className="label">
                  <span className="label-text">
                    <ImagePlus className="inline-block mr-2" /> Avatar
                  </span>
                </label>
                <input
                  type="file"
                  id="Avatar"
                  name="avatar"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                />
              </div>

              {/* Password and Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password */}
                <div className="form-control">
                  <label htmlFor="Password" className="label">
                    <span className="label-text">
                      <Lock className="inline-block mr-2" /> Password
                    </span>
                  </label>
                  <input
                    type="password"
                    id="Password"
                    name="password"
                    placeholder="Create a password"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="form-control">
                  <label htmlFor="PasswordConfirmation" className="label">
                    <span className="label-text">
                      <Lock className="inline-block mr-2" /> Confirm Password
                    </span>
                  </label>
                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    placeholder="Confirm your password"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary" required />
                  <span className="label-text">
                    I agree to the <a href="#" className="link link-primary">terms and conditions</a> and the <a href="#" className="link link-primary">privacy policy</a>.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-control">
                <button type="submit" className="btn btn-primary w-full">
                  Create an account
                </button>
              </div>

              {/* Already have an account */}
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link to={"/login"} className="link link-primary">Log in</Link>.
              </p>
            </form>

          </div>
        </main>
      </div>
    </section>
  );
};

export default Signup;
