import Joi from "joi";
import { joiSchemas } from "@/utilities/schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { appToast } from "@/utilities/appToast";
import Icon from "@/assets/image/logo.png";
import Input from "@/common/form/Input";
import { Button, CircularProgress } from "@mui/material"; // Import CircularProgress for loading spinner
import GoogleIcon from "@/common/icons/GoogleIcon";
import { Link } from "react-router-dom";
import routes from "@/navigation/routes";
import { useGoogleLoginMutation, useRegisterUserMutation } from "@/api/apiSlice";
import userStore from "@/utilities/stores";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { ApiError, RegisterApiRequest } from "@/types/types";
import { userRoles } from "@/utilities/constants";

const schema = Joi.object<RegisterApiRequest>({
  first_name: joiSchemas.first_name,
  last_name: joiSchemas.last_name,
  email: joiSchemas.email,
  phone: joiSchemas.phone,
  password: joiSchemas.password,
  password_confirmation: joiSchemas.confirmPassword,
});

const SignUp = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterApiRequest>({ resolver: joiResolver(schema) });

  const [registerUser, { isLoading: isLoginLoading }] = useRegisterUserMutation();

  const [googleSignup, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const isLoading = isLoginLoading || isGoogleLoading

  // BASIC SIGNUP
  const onSubmit = handleSubmit(async ({ email, first_name, last_name, password, password_confirmation, phone }) => {
    try {
      const response = await registerUser({
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
        phone,
      }).unwrap();
      processSignupResponse(response);
      navigate(routes.LOGIN)
    } catch (error) {
      const typedError = error as ApiError;
      console.log("Full API error:", typedError);
      const errorMessage =
        typedError?.data?.message || "Sign Up Failed. Please try again.";
      appToast.Error(errorMessage);
    }
  });

  // GOOGLE SIGNUP
  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        if (!userInfoResponse.ok) {
          throw new Error('Failed to get user info from Google');
        }

        const userInfo = await userInfoResponse.json();

        // Call your backend with Google user info
        const response = await googleSignup({
          googleToken: tokenResponse.access_token,
          email: userInfo.email,
          name: userInfo.name
        }).unwrap();

        const firstNameFromGoogle = userInfo.name.split(' ')[0];
        const lastNameFromGoogle = userInfo.name.split(' ').slice(1).join(' ');
        response.data.user = { // Mock the structure to match normal signup response
          first_name: firstNameFromGoogle,
          last_name: lastNameFromGoogle,
          email: userInfo.email,
          ...response.data.user // Keep any other user data from the backend
        };
        processSignupResponse(response);

        const role = response.data?.user?.role;

        switch (role) {
          case userRoles.ADMIN:
            navigate(routes.AdminRoute.ADMIN_DASHBOARD);
            break;
          case userRoles.RIDER:
            navigate(routes.RidersRoute.RIDER_DASHBOARD);
            break;
          default:
            navigate(routes.usersRoutes.DASHBOARD);
        }



      } catch (error) {
        console.error('Google signup error:', error);
        const typedError = error as ApiError;
        const errorMessage =
          typedError?.data?.error || "Google Sign-Up failed. Please try again.";
        appToast.Error(errorMessage);
      }
    },
    onError: () => {
      appToast.Error("Google Sign-Up failed. Please try again.");
    },
  });


  return (
    <div className="bg-successActiveColorLight py-4">
      {/* Image at the top */}
      <div className="mb-4 p-6 md:my-auto">
        <img
          src={Icon}
          alt="Delivery Logo"
          className="h-6 w-auto sm:h-4 lg:h-12"
        />
      </div>

      <div className="mx-2 flex h-[80%] flex-col items-center justify-center lg:mx-auto">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg lg:max-w-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-gray-600">Please enter your details</p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-y-1">
            <div className="flex flex-col lg:flex-row lg:gap-x-6">
              <Input
                placeholder="First Name"
                name="first_name"
                register={register}
                error={errors.first_name}
              />
              <Input
                placeholder="Last Name"
                name="last_name"
                register={register}
                error={errors.last_name}
              />
            </div>

            <Input
              placeholder="Email"
              name="email"
              register={register}
              error={errors.email}
              type="email"
            />
            <Input
              placeholder="Phone Number"
              name="phone"
              register={register}
              error={errors.phone}
              type="tel"
            />
            <Input
              placeholder="Password"
              name="password"
              register={register}
              error={errors.password}
              type="password"
              showPasswordToggle
            />
            <Input
              placeholder="Confirm Password"
              name="password_confirmation"
              register={register}
              error={errors.password_confirmation}
              type="password"
              showPasswordToggle
            />

            {/* Button with loading spinner */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading} // Disable the button while loading
            >
              {isLoading ? (
                <>
                  <CircularProgress size={24} color="inherit" />{" "}
                  {/* Show spinner */}
                  &nbsp;Creating Account... {/* Optional text update */}
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <p className="my-4 text-center text-base md:text-lg">
              Already have an account?{" "}
              <Link to={routes.LOGIN}>
                {" "}
                <span className="font-bold">Login</span>{" "}
              </Link>
            </p>

            <p className="mb-2 text-center text-sm font-bold md:text-lg">Or</p>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              className="my-2"
              size="small"
              sx={{
                borderColor: "#d0d5dd",
                color: "#344054",
              }}
              onClick={() => handleGoogleSignup()}
              disabled={isLoading}
            >
              {isGoogleLoading ? (
                <>
                  <CircularProgress size={24} color="inherit" />
                  &nbsp;Processing...
                </>
              ) : (
                "Continue with Google"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const processSignupResponse = (response: { data: { user: any; token?: any; }; message: any; }) => {
  const {
    token,
    user: { first_name, last_name, email },
  } = response.data;

  const user = {
    name: `${first_name} ${last_name || ''}`,
    email: email,
  };

  // Determine the role (default to 'user' if not present or invalid)
  const role = response.data?.user?.role;
  const isValidRole = role === userRoles.ADMIN || userRoles.RIDER || userRoles.USER;
  const safeRole = isValidRole ? role : 'user';

  userStore.loginUser(token, user, safeRole);
  appToast.Success(response?.message || "Sign Up Successful");

};

export default SignUp;
