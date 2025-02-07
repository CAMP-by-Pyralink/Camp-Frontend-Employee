import React, { useState } from "react";
import { Link } from "react-router-dom";
import eyes from "../../assets/eye-off.png";

const SignIn = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic
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
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full mt-2 p-4 border rounded-lg outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#101928] text-sm font-medium">
              Password
            </label>
            <div className="mt-2 border rounded-lg px-4 flex items-center justify-between">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full outline-none py-4"
                required
              />
              <div className="">
                <img src={eyes} alt="" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary500 text-white py-3 rounded-lg font-bold"
          >
            Login
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
