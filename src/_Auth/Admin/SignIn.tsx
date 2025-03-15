import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useAuthStore } from "../../store/useAuthStrore";
import { Loader2 } from "lucide-react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, isSigningIn } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = {
      email: formData.email,
      password: formData.password,
      authProvider: "manual",
    };
    console.log(loginData);

    const response = await login(loginData);
    console.log(response);
    if (response) {
      navigate("/");
    }
  };

  return (
    <div className=" font-poppins lex items-center max-h-screen max-w-[454px] ">
      <div className=" w-full h-full">
        {/*  */}
        <div>
          <h2 className="text-3xl text-[#1B1818] font-bold">Welcome back</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="mb-4">
            <label className="block font-medium text-[#101928] text-sm">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-4 border rounded-lg outline-none"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-[#101928] text-sm font-medium">
              Password
            </label>
            <div className="mt-2 border rounded-lg px-4 flex items-center justify-between">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none py-4"
                required
              />
              <div
                className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEye className=" text-gray-400" />
                ) : (
                  <FaEyeSlash className=" text-gray-400 transition-all" />
                )}
              </div>
            </div>
          </div>

          <button
            disabled={!!isSigningIn}
            type="submit"
            className={`w-full bg-primary500 text-white py-3 rounded-lg font-bold flex items-center justify-center
              ${isSigningIn ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSigningIn ? (
              <>
                <Loader2 className=" size-6 mr-2 animate-spin" />
                <span className="ml-2">Signing in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-[#645D5D] text-sm mt-8">
            Forgot Password?{" "}
            <Link
              to={"/auth/forgot-password"}
              className="text-[#C7C7CC] text-sm font-semibold"
            >
              Recover
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
