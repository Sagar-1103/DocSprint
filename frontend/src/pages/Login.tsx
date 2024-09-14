import { FileText, Lock, User} from 'lucide-react';
import Lottie from "lottie-react";
import DocAnimation from "../animation/doc-animation.json";
import { Link } from 'react-router-dom';

const Login = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Login</h1>

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

              

              

              

              {/* Password and Confirm Password */}
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

                

              {/* Terms and Conditions */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary" required />
                  <div className="label-text w-96">
                    Remember me
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-control">
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>

              {/* Forgot Password */}
              <p className="text-center text-sm">
                <Link to={"/forgot-password"} className="link link-primary">Forgot your password?</Link>
              </p>

              {/* Already have an account */}
              <p className="text-center text-sm">
               Don&apos;t have an account?{" "}
                <Link to={"/signup"} className="link link-primary">Sign up</Link>.
              </p>
            </form>

          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
