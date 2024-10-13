import { proxy } from 'valtio';

// Define the initial state
const userStore = proxy({
  token: null as string | null,
  user: null as { name: string; email: string } | null,
  userType: null as 'admin' | 'user' | null,

  // Method to log in the user and save to localStorage
  loginUser(token: string, user: { name: string; email: string }, userType: 'admin' | 'user') {
    this.token = token;
    this.user = user;
    this.userType = userType;

    // Save the data in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userType', userType);
  },

  // Method to log out the user and clear the state and localStorage
  logoutUser() {
    this.token = null;
    this.user = null;
    this.userType = null;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  },
});

// Load any saved data from localStorage on app initialization
const loadUserDataFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const userType = localStorage.getItem('userType');

  if (token && user && userType) {
    userStore.token = token;
    userStore.user = JSON.parse(user);
    userStore.userType = userType as 'admin' | 'user';
  }
};

loadUserDataFromLocalStorage();

export default userStore;
