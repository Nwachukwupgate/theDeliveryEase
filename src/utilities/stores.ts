import { proxy } from "valtio";

// Define the initial state
const userStore = proxy({
  token: null as string | null,
  user: null as { name?: string; email: string; id?: number } | null,
  userType: null as "admin" | "user" | "rider" | null,

  // Getter method to check if the user is a rider
  get isRider(): boolean {
    return this.userType === "rider";
  },

  // Getter method to check if the user is an admin
  get isAdmin(): boolean {
    return this.userType === "admin";
  },

  // Getter method to check if the user is a regular user
  get isRegularUser(): boolean {
    return this.userType === "user";
  },

  // Method to log in the user and save to localStorage
  loginUser(
    token: string,
    user: { id?: number; name?: string; email: string },
    userType: "admin" | "user" | "rider",
  ) {
    this.token = token;
    this.user = user;
    this.userType = userType;

    // Save the data in localStorage
    localStorage.setItem("DELogisticsToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userType", userType);
  },

  // Method to log out the user and clear the state and localStorage
  logoutUser() {
    this.token = null;
    this.user = null;
    this.userType = null;

    localStorage.removeItem("DELogisticsToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
  },
});

// Load any saved data from localStorage on app initialization
const loadUserDataFromLocalStorage = () => {
  const token = localStorage.getItem("DELogisticsToken");
  const user = localStorage.getItem("user");
  const userType = localStorage.getItem("userType");

  if (token && user && userType) {
    userStore.token = token;
    userStore.user = JSON.parse(user);
    userStore.userType = userType as "admin" | "user";
  }
};

loadUserDataFromLocalStorage();

export default userStore;
