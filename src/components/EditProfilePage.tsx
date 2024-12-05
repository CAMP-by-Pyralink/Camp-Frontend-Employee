import React from "react";
import profile from "../assets/chi.jpg";

const EditProfilePage = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="text-[#282EFF]">Dashboard</p>
        <p>/</p>
        <p>Edit Profile</p>
      </div>

      <div className="border border-dotted border-black px-[30px] py-[30px] rounded-[20px] relative">
        <p className="absolute left-[50%] -translate-x-[50%] bg-white py-1 px-2 -top-[17px]">
          Profile Details
        </p>

        <div className=" bg-[#EBECFF] py-[20px] px-[30px] rounded-[20px]">
          <form action="" className="max-w-[700px] px-10 mx-auto">
            <div className="w-full flex flex-col items-center justify-center gap-2">
              {/* images */}
              <div className="relative w-fit">
                {/* image */}
                <div className="w-[10rem] aspect-square overflow-hidden rounded-full mx-auto relative ">
                  <img
                    className="w-full h-full object-cover"
                    src={profile}
                    alt=""
                  />
                </div>

                <div className=" bg-black text-white px-[10px] py-[5px] absolute bottom-4 left-[2rem]">
                  <input type="file" name="image" id="image-input" hidden />
                  <label htmlFor="image-input" className="cursor-pointer">
                    Edit Image
                  </label>
                </div>
              </div>

              {/* firstname */}
              <div className="w-full">
                <label htmlFor="" className="text-[#000000B2]">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444]"
                    value={"Sarah"}
                  />
                </div>
              </div>

              {/* lastname */}
              <div className="w-full">
                <label htmlFor="" className="text-[#000000B2]">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444]"
                    value={"Brown"}
                  />
                </div>
              </div>

              {/* email */}
              <div className="w-full">
                <label htmlFor="" className="text-[#000000B2]">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444]"
                    value={"Sarahbrown@gmail.com"}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="w-full">
                <label htmlFor="" className="text-[#000000B2]">
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444]"
                    value={"House 6,Troupe street, Ajah."}
                  />
                </div>
              </div>

              {/* phone */}
              <div className="w-full">
                <label htmlFor="" className="text-[#000000B2]">
                  Phone number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444]"
                    value={"07045656544"}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4">
                <button className=" border border-[#282EFF] text-[#282EFF] flex items-center justify-center gap-2 w-[126px] text-sm font-medium px-[12px] py-[10px] rounded">
                  Discard
                </button>
                <button className=" bg-[#282EFF] text-white flex items-center gap-2 justify-center w-[126px] text-sm font-medium px-[12px] py-[10px] rounded">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* password */}
      <div className="border border-dotted border-black px-[30px] py-[30px] rounded-[20px] relative mt-10">
        <p className="absolute left-[50%] -translate-x-[50%] bg-white py-1 px-2 -top-[17px]">
          Change Password
        </p>

        <div className=" bg-[#EBECFF] py-[20px] px-[30px] rounded-[20px]">
          <form action="" className="max-w-[700px] px-10 mx-auto">
            <div className="w-full flex flex-col items-center justify-center gap-2">
              {/* current password */}
              <div className="w-full">
                <div className="mt-1">
                  <input
                    type="text"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444] placeholder:text-[#9F9C9C]"
                    placeholder="Current Password"
                  />
                </div>
              </div>

              {/* new password */}
              <div className="w-full">
                <div className="mt-1">
                  <input
                    type="text"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444] placeholder:text-[#9F9C9C]"
                    placeholder="New Password"
                  />
                </div>
              </div>

              {/* confirm password */}
              <div className="w-full">
                <div className="mt-1">
                  <input
                    type="text"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444] placeholder:text-[#9F9C9C]"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4">
                <button className=" border border-[#282EFF] text-[#282EFF] flex items-center justify-center gap-2 w-[126px] text-sm font-medium px-[12px] py-[10px] rounded">
                  Discard
                </button>
                <button className=" bg-[#282EFF] text-white flex items-center gap-2 justify-center w-[126px] text-sm font-medium px-[12px] py-[10px] rounded">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
