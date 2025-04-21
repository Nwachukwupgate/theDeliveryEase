import { useSnapshot } from "valtio";
import userStore from "@/utilities/stores";

const WelcomeGreeting = () => {
    const { user, userType } = useSnapshot(userStore);

    if (!user || !userType) {
        return null;
    }

    // Get current time
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Determine time of day
    let greeting;
    if (currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    // Format the user type for display (capitalize first letter)
    const formattedUserType = userType.charAt(0).toUpperCase() + userType.slice(1);

    return (
        <div className="welcome-greeting font-medium text-xs md:text-sm">
            <p>{greeting}, {user.name}</p>
            {!userStore.isRegularUser && <p className=" mt-1">
                <span className=" font-semibold">Role:</span> {formattedUserType}
            </p>}
        </div>
    );
};

export default WelcomeGreeting;