import React, { useState } from "react";
import checkIcon from "../../assets/svg/check.svg";
import { Link } from "react-router-dom";
import eyes from "../../assets/eye-off.png";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Submit new password logic
    console.log("New password:", formData.newPassword);
  };

  return (
    <div className=" w-full">
      <div className="bg-white p-8 rounded-lg  w-full flex items-center max-w-[454px]">
        <div className="w-full pl-6">
          <h2 className="text-3xl text-[#1E293B] font-medium  mb-4">
            Reset Password
          </h2>
          <p className=" text-[#475569] text-lg mb-4">
            Please enter and confirm your new password. <br /> You will need to
            login after you reset.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium">New Password</label>
              <div className="mt-2 border rounded-lg px-4 flex items-center justify-between">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full outline-none py-4"
                  required
                  placeholder="********"
                />
                <div className="">
                  <img src={eyes} alt="" />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-medium">Confirm New Password</label>

              <div className="mt-2 border rounded-lg px-4 flex items-center justify-between">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full outline-none py-4"
                  required
                  placeholder="********"
                />
                <div className="">
                  <img src={eyes} alt="" />
                </div>
              </div>
            </div>

            {/* Password requirements */}
            <ul className="text-gray-600 flex flex-col gap-y-2 text-sm mb-6">
              <li className=" text-[#292626] font-medium flex items-center gap-2">
                <img src={checkIcon} alt="" /> Be a minimum of 8 characters long
              </li>
              <li className=" text-[#292626] font-medium flex items-center gap-2">
                <img src={checkIcon} alt="" /> Include at least one number
              </li>
              <li className=" text-[#292626] font-medium flex items-center gap-2">
                <img src={checkIcon} alt="" /> Have at least one uppercase and
                one lowercase letter
              </li>
            </ul>

            <Link to="/auth/reset-password">
              <button
                type="submit"
                className="w-full bg-primary500 text-white py-3 rounded-lg "
              >
                Reset Password
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
