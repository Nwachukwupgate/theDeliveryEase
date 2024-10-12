import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Get the URL query parameters
const urlParams = new URLSearchParams(window.location.search);

// Get the encoded user profile data
const encodedProfile = urlParams.get("user-profile");
if (encodedProfile !== null) {
  // Decode the encoded user profile data
  const userProfile = JSON.parse(decodeURIComponent(encodedProfile));

  // Safely set the profile string in localStorage
  const myArrayString = JSON.stringify(userProfile);
  localStorage.setItem("name", myArrayString);
}

// Get the name from localStorage (could be null)
let myArrayString = localStorage.getItem("name");

// If null, set an empty string as a fallback
myArrayString = myArrayString !== null ? myArrayString : '';

// Parse user details if the string is valid JSON
const userDetails = myArrayString ? JSON.parse(myArrayString) : null;

// Define the type for the user state
export interface UserState {
  users: typeof userDetails;
  token: string | null;
  role: string | null;
  galleryDetails: any | null;
  units: any | null;
  photo: string | null;
}

// Initial state
const initialState: UserState = {
  users: userDetails,
  token: userDetails?.token ?? null,
  role: userDetails?.role?.name ?? null,
  galleryDetails: null,
  units: null,
  photo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SingleGallery: (state, action: PayloadAction<any>) => {
      state.galleryDetails = action.payload;
    },
    AddUnits: (state, action: PayloadAction<any>) => {
      state.units = action.payload;
    },
    AddPhoto: (state, action: PayloadAction<string>) => {
      state.photo = action.payload;
    },
  },
});

export const { SingleGallery, AddUnits, AddPhoto } = userSlice.actions;
export default userSlice.reducer;
