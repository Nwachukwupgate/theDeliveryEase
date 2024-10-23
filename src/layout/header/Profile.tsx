// import DefaultDpDisplay from "@/common/display/DefaultDpDisplay";
// import SettingsIcon from "@/common/icons/pack/SettingsIcon";
// import SignOutIcon from "@/common/icons/pack/SignOut";
// import UserProfileFill from "@/common/icons/pack/UserProfileFill";
import AppMenuWrapper from "@/common/utilities/AppMenuWrapper";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "@/api/apiSlice";


const Profile: React.FC = () => {
  const { data } = useGetUserQuery()

  return (
    <div className={`cursor-pointer`}>
      <AppMenuWrapper
        header={
          <div className="flex items-center">
            <div className="block lg:hidden">
              {/* <UserProfileFill fill="#008CDB" /> */}
            </div>
            <div className={`hidden lg:block`}>
              {/* <UserProfileFill /> */}
            </div>
            <div className="ml-4 hidden flex-col items-start lg:flex">
              <span>{data?.data?.item?.first_name} {data?.data?.item?.last_name}</span>
            </div>
          </div>
        }
        border={false}
      >
        <nav className="w-[300px] rounded-xl bg-white [box-shadow:0px_0px_10px_rgba(230,244,251,1)]">
          <div className={`flex flex-col gap-4 px-6 py-8`}>
            {/* <DefaultDpDisplay
              bg="rgba(230, 244, 251, 1)"
              fullName="Charles Paul"
              role="Facility Manager"
            /> */}
            <Link to={""} className="flex items-center gap-2">
              <span>
                {/* <SettingsIcon /> */}
              </span>
              <span>Settings</span>
            </Link>
            <button className="flex items-center gap-2 [appearance:none]">
              <span>
                {/* <SignOutIcon /> */}
              </span>
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </AppMenuWrapper>
    </div>
  );
};

export default Profile;