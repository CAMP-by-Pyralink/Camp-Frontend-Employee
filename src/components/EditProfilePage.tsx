import { useState, useEffect } from "react";
import { useUserStore, updateProfile } from "../store/useUserStore";
import { Link } from "react-router-dom";

const EditProfilePage = () => {
  const {
    updateProfile: updateUserProfile,
    getCurrentUser,
    currentUser,
    isLoading,
  } = useUserStore();

  const [formData, setFormData] = useState<updateProfile>({
    fName: "",
    lName: "",
    homeAddress: "",
    phoneNumber: "",
    profileImage: "",
  });

  // Fetch current user data if not already available
  useEffect(() => {
    if (!currentUser) {
      getCurrentUser();
    } else {
      // Pre-fill form with current user data
      setFormData({
        fName: currentUser.fName || "",
        lName: currentUser.lName || "",
        homeAddress: currentUser.homeAddress || "",
        phoneNumber: currentUser.phoneNumber || "",
        profileImage: currentUser.profileImage || "",
      });
    }
  }, [currentUser, getCurrentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile(formData);
  };

  // Convert file to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];

        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("File is too large. Please select an image under 5MB.");
          return;
        }

        // Convert to base64
        const base64 = await convertToBase64(file);

        // Update form data with base64 string
        setFormData((prev) => ({
          ...prev,
          profileImage: base64,
        }));
      } catch (error) {
        console.error("Error converting image to base64:", error);
        alert("Failed to process image. Please try again.");
      }
    }
  };

  return (
    <div className="font-poppins">
      <div className="flex items-center gap-2">
        <Link to="/">
          <p className="text-[#282EFF] cursor-pointer">Dashboard</p>
        </Link>{" "}
        <p>/</p>
        <p>Edit Profile</p>
      </div>

      <div className="border border-dotted border-black px-[30px] py-[30px] rounded-[20px] relative">
        <p className="absolute left-[50%] -translate-x-[50%] bg-white py-1 px-2 -top-[17px]">
          Profile Details
        </p>

        <div className=" bg-[#EBECFF] py-[20px] px-[30px] rounded-[20px]">
          <form
            onSubmit={handleProfileUpdate}
            className="max-w-[700px] px-10 mx-auto"
          >
            <div className="w-full flex flex-col items-center justify-center gap-2">
              {/* images */}
              <div className="relative w-fit">
                {/* image */}
                <div className="w-[10rem] aspect-square bg-[#D4CFCF] overflow-hidden rounded-full mx-auto relative ">
                  {formData.profileImage ? (
                    <img
                      className="w-full h-full object-cover"
                      src={formData.profileImage}
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-semibold">
                      {formData.fName && formData.lName
                        ? `${formData.fName.charAt(0)}${formData.lName.charAt(
                            0
                          )}`
                        : ""}
                    </div>
                  )}
                </div>

                <div className=" bg-black text-white px-[10px] py-[5px] absolute bottom-4 left-[2rem]">
                  <input
                    type="file"
                    name="profileImage"
                    id="image-input"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="image-input" className="cursor-pointer">
                    Edit Image
                  </label>
                </div>
              </div>

              {/* firstname */}
              <div className="w-full">
                <label htmlFor="fName" className="text-[#000000B2]">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="fName"
                    name="fName"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444]"
                    value={formData.fName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* lastname */}
              <div className="w-full">
                <label htmlFor="lName" className="text-[#000000B2]">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="lName"
                    name="lName"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444]"
                    value={formData.lName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* email */}
              <div className="w-full">
                <label htmlFor="email" className="text-[#000000B2]">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444]"
                    value={currentUser?.email || ""}
                    disabled
                  />
                </div>
              </div>

              {/* Address */}
              <div className="w-full">
                <label htmlFor="homeAddress" className="text-[#000000B2]">
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="homeAddress"
                    name="homeAddress"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444]"
                    value={formData.homeAddress}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* phone */}
              <div className="w-full">
                <label htmlFor="phoneNumber" className="text-[#000000B2]">
                  Phone number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444]"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  type="button"
                  className="border border-[#282EFF] text-[#282EFF] flex items-center justify-center gap-2 w-[126px] text-sm font-medium px-[12px] py-[10px] rounded"
                  onClick={() => {
                    if (currentUser) {
                      setFormData({
                        fName: currentUser.fName || "",
                        lName: currentUser.lName || "",
                        homeAddress: currentUser.homeAddress || "",
                        phoneNumber: currentUser.phoneNumber || "",
                        profileImage: currentUser.profileImage || "",
                      });
                    }
                  }}
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="bg-[#282EFF] text-white flex items-center gap-2 justify-center w-[126px] text-sm font-medium px-[12px] py-[10px] rounded"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
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
                    type="password"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444] placeholder:text-[#9F9C9C]"
                    placeholder="Current Password"
                  />
                </div>
              </div>

              {/* new password */}
              <div className="w-full">
                <div className="mt-1">
                  <input
                    type="password"
                    className="w-full rounded-lg p-[10px] border border-[#372B2466] outline-none bg-white text-[#444444] placeholder:text-[#9F9C9C]"
                    placeholder="New Password"
                  />
                </div>
              </div>

              {/* confirm password */}
              <div className="w-full">
                <div className="mt-1">
                  <input
                    type="password"
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
