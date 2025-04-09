import { Link } from "react-router-dom"; // Keep Link
import { useGetUserQuery } from "@/api/apiSlice";
import { usersRoutes } from "@/navigation/routes";
import { FaUser } from "react-icons/fa";

const Profile: React.FC = () => {
  // Consider adding isLoading/isError for better UX
  const { data, isLoading, isError } = useGetUserQuery();

  if (isLoading) {
    // You can return a placeholder, spinner, or null
    return <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>;
  }

  // Decide what to show if the user data fails to load
  if (isError || !data?.data?.item) {
    return (
      <Link to={usersRoutes.SETTING} aria-label="User Settings">
        <FaUser  className="w-6 h-6 md:w-8 md:h-8" />
      </Link>
    );
  }

  // TODO REMOVE FORMER API URL

  const user = data.data.item;
  // const userImage = user.photo
  //   ? `https://deliver.door-steps.pro/storage/${user.photo}`
  //   :  <FaUser  className="w-6 h-6 md:w-8 md:h-8" />

  // Wrap the entire visible profile display in a Link
  return (
    <Link to={usersRoutes.SETTING} className="flex items-center cursor-pointer group" aria-label="User Settings">
      {/* <img
        src={userImage}
        alt="User profile image"
        className="w-10 h-10 rounded-full transition-all duration-200 ease-in-out group-hover:opacity-80" // Example hover effect
      /> */}
      <div className="ml-3 hidden lg:flex flex-col items-start">
        <span className="transition-colors duration-200 ease-in-out group-hover:text-gray-600">
          {user.first_name} {user.last_name}
        </span>
      </div>
    </Link>
  );
};



export default Profile;