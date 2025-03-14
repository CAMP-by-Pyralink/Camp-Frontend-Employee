import { useNavigate } from "react-router-dom";
import add from "../assets/add.png";
import pic from "../assets/chi.jpg";
import pad from "../assets/padlock.png";
import { useUserStore } from "../store/useUserStore";
import { useEffect } from "react";
const ProfilePage = () => {
  const navigate = useNavigate();

  const { getCurrentUser, isLoading } = useUserStore();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const editProfile = () => {
    navigate("/profile/edit");
  };
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-[24px] font-medium text-[#444444]">Profile</h1>

        <div>
          <button
            className=" bg-[#282EFF] text-white flex items-center gap-2 w-[126px] text-sm font-medium px-[12px] py-[10px] rounded"
            onClick={editProfile}
          >
            <img src={add} alt="" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="bg-[#EBECFF] p-[40px] mt-10">
        <div className="bg-white p-[20px] rounded-[10px] flex items-center gap-10">
          {/* flex 1 */}
          <div className="flex items-center gap-4 w-[40%]">
            {/* image */}
            <div>
              <div className="w-[96px] border-[3px] border-[#FFFFFF] aspect-square rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src={pic} alt="" />
              </div>
            </div>

            {/* name */}
            <div>
              <p className="font-medium text-[20px]">Sarah Brown</p>
              <p>Accountant</p>
              <p>PY 12134</p>
            </div>
          </div>

          {/* flex 2 */}
          <div className="flex items-center justify-between w-full border-l border-[#E0E1FF] pl-7">
            <div>
              <p>Phone No:</p>
              <p className="py-3">Email Address:</p>
              <p>Address</p>
            </div>
            <div className="font-medium">
              <p>07045637821</p>
              <p className="py-3">Sarahbrown@gmail.com</p>
              <p>House 6, Truope street, Ajah</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex items-center justify-between bg-white rounded-t-[10px] p-[10px]">
            <p>Contracts & Agreements</p>

            <div>
              <img src={pad} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between bg-white mt-0.5 p-[10px]">
            <div>
              <p>Worker Type</p>
              <p className="py-3">Role</p>
              <p>Permission</p>
            </div>
            <div className="font-medium text-right">
              <p>Full time</p>
              <p className="py-3">Accountant</p>
              <p>User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
