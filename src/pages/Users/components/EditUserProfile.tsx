import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Box, Typography, Divider, Skeleton } from "@mui/material"; // Added Box, Typography, Divider, Skeleton
import Input from "@/common/form/Input"; // Assuming Input component can handle disabled prop
import { useGetUserQuery, useEditUserMutation } from "@/api/apiSlice"; // Import updated hooks
import { appToast } from "@/utilities/appToast";
import { ApiError } from "@/types/types"; // Keep ApiError type
import { useSnapshot } from "valtio";
import userStore from "@/utilities/stores";

// Interface for form data (photo removed)
interface AccountFormData {
    firstName: string;
    lastName: string;
    email: string;
    occupation: string;
    address: string;
}

interface EditUserPayload {
    first_name: string;
    last_name: string;
    occupation: string;
    address: string;
}


const EditUserProfile = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset, // Use reset to populate form
    } = useForm<AccountFormData>();

    const userState = useSnapshot(userStore);
    const isRider = userState.isRider;

    const { data: userData, isLoading: isUserLoading, isFetching: isUserFetching, error: fetchError } = useGetUserQuery();

    // --- Edit User Mutation ---
    const [editUser, { isLoading: isUpdating }] = useEditUserMutation();

    // --- State for Photo (Commented out for now) ---
    // const [preview, setPreview] = useState<string | null>(null);
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // --- Effect to Populate Form ---
    useEffect(() => {
        if (userData?.data?.user) {
            const user = userData.data.user;
            // Use reset to populate the form with fetched data
            reset({
                firstName: user.first_name || "",
                lastName: user.last_name || "",
                email: user.email || "",
                occupation: user.occupation || "",
                address: user.address || "",
            });

            // --- Handle potential photo display if needed later ---
            // if (user.photo) {
            //     // Assuming user.photo is a URL to the image
            //     setPreview(user.photo);
            // } else {
            //     setPreview(null);
            // }
        }
    }, [userData, reset]);

    // --- Handle Image Change (Commented out for now) ---
    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setPreview(URL.createObjectURL(file));
    //         setSelectedFile(file); // Store the selected file in state
    //     } else {
    //          // Optionally reset preview if user cancels file selection
    //          // setPreview(userData?.data?.user?.photo || null); // Reset to original or null
    //          // setSelectedFile(null);
    //     }
    // };

    // --- Form Submission ---
    const onSubmit = handleSubmit(async (data) => {
        // Create the payload expected by the backend mutation
        const payload: EditUserPayload = {
            first_name: data.firstName,
            last_name: data.lastName,
            occupation: data.occupation,
            address: data.address,
        };

        // --- FormData approach (Commented out) ---
        // const formData = new FormData();
        // formData.append("first_name", data.firstName);
        // formData.append("last_name", data.lastName);
        // // formData.append("email", data.email); // Don't append email if not editable
        // formData.append("occupation", data.occupation);
        // formData.append("address", data.address);
        // if (selectedFile) {
        //     formData.append("photo", selectedFile);
        // }
        // --- End FormData approach ---

        try {
            // Send the plain payload object
            const response = await editUser(payload).unwrap();
            appToast.Success(response?.message || "Profile updated successfully!");

        } catch (error) {
            console.error("Update Error:", error);
            const typedError = error as ApiError;
            // Check nested structure for backend validation errors if applicable
            const backendMessage = typedError?.data?.message || typedError?.data?.message;
            const errorMessage = backendMessage || "Update Failed. Please try again.";
            appToast.Error(errorMessage);
        }
    });

    // --- Loading State ---
    if (isUserLoading || isUserFetching) {
        return (
            <Box sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom><Skeleton width="200px" /></Typography>
                <Typography color="text.secondary" gutterBottom><Skeleton width="300px" /></Typography>
                <Divider sx={{ my: 2 }} />
                <Skeleton variant="text" width="100%" height={40} />
                <Divider sx={{ my: 2 }} />
                <Skeleton variant="text" width="100%" height={40} />
                <Divider sx={{ my: 2 }} />
                {/* Skeleton for Photo section (if you uncomment it later) */}
                {/* <Skeleton variant="text" width="100%" height={80} />
                <Divider sx={{ my: 2 }} /> */}
                <Skeleton variant="text" width="100%" height={40} />
                <Divider sx={{ my: 2 }} />
                <Skeleton variant="text" width="100%" height={40} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Skeleton variant="rectangular" width={100} height={36} />
                </Box>
            </Box>
        );
    }

    // --- Error State ---
    if (fetchError) {
        return <Typography color="error">Failed to load user data. Please try refreshing.</Typography>;
    }
    return (
        <>
            <div className="my-8">
                <div>
                    <p className="font-bold text-xl">Personal Info</p>
                    <p className="text-[#667085]">Update your personal details here.</p>
                </div>
            </div>

            <form onSubmit={onSubmit}>
                <div className="w-full border my-4"></div>
                {/* ----- Name ----- */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-3">
                    <div className="mb-4 lg:mb-0 lg:basis-3/12 font-medium">
                        Name
                    </div>
                    <div className="flex flex-col sm:flex-row basis-[100%] lg:basis-9/12 gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="First Name"
                                name="firstName"
                                register={register}
                                error={errors.firstName}
                                type="text"
                                rules={{ required: "First name is required" }} // Add validation
                                disabled={isRider}
                            />
                        </div>
                        <div className="flex-1">
                            <Input
                                placeholder="Last Name"
                                name="lastName"
                                register={register}
                                error={errors.lastName}
                                type="text"
                                rules={{ required: "Last name is required" }} // Add validation
                                disabled={isRider}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full border my-4"></div>
                {/* ----- Email (Disabled) ----- */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-3">
                    <div className="mb-4 lg:mb-0 lg:basis-3/12 font-medium">
                        Email
                    </div>
                    <div className="basis-[100%] lg:basis-9/12">
                        <Input
                            placeholder="Email"
                            name="email"
                            register={register} // Register it to populate value via reset
                            error={errors.email}
                            type="email"
                            disabled={true} // Disable the input
                            className="bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* ----- Photo Section (Commented Out) ----- */}
                {/*
                <div className="w-full border my-4"></div>
                <div className="mb-4 flex flex-col lg:flex-row lg:justify-between lg:items-start py-3">
                    <div className="mb-4 lg:mb-0 lg:basis-3/12">
                        <label htmlFor="photo" className="block font-medium text-gray-700">
                            Your Photo
                        </label>
                        <p className="text-sm text-[#667085]">
                            This will be displayed on your profile.
                        </p>
                    </div>
                    <div className="basis-[100%] lg:basis-9/12 flex flex-col sm:flex-row items-start gap-4">
                        <div className="mt-1">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile Preview"
                                    className="h-24 w-24 rounded-full object-cover" // Adjusted size and added object-cover
                                />
                            ) : (
                                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Photo
                                </div> // Placeholder
                            )}
                        </div>
                        <div className="flex-1 mt-2 sm:mt-0">
                            <input
                                id="photo"
                                type="file"
                                accept="image/*"
                                // {...register("photo")} // Registering file input with RHF can be tricky, handling via state is often easier
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                onChange={handleImageChange}
                            />
                             <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                             {errors.photo && <span className="text-red-500 text-sm">{errors.photo.message}</span>}
                        </div>
                    </div>
                </div>
                */}

                <div className="w-full border my-4"></div>
                {/* ----- Occupation ----- */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-3">
                    <div className="basis-3/12 mb-4 lg:mb-0 font-medium">
                        Occupation
                    </div>
                    <div className="basis-[100%] lg:basis-9/12">
                        <Input
                            placeholder="e.g., Software Engineer"
                            name="occupation"
                            register={register}
                            error={errors.occupation}
                            type="text"
                            disabled={isRider}
                        />
                    </div>
                </div>

                <div className="w-full border my-4"></div>
                {/* ----- Address ----- */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-3">
                    <div className="basis-3/12 mb-4 lg:mb-0 font-medium">
                        Address
                    </div>
                    <div className="basis-[100%] lg:basis-9/12">
                        <Input
                            placeholder="e.g., 123 Main St, Anytown"
                            name="address"
                            register={register}
                            error={errors.address}
                            type="text"
                            disabled={isRider}
                        />
                    </div>
                </div>

                {/* ----- Submit Button ----- */}
                <div className="flex justify-end mt-6 mb-4">
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isUpdating || isRider} // Disable button while updating
                        sx={{ minWidth: 100 }} // Give button minimum width
                    >
                        {isUpdating ? (
                            <>
                                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default EditUserProfile;