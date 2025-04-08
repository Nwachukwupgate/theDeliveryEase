import Joi from "joi";
import { joiSchemas } from "@/utilities/schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { appToast } from "@/utilities/appToast";
import Icon from "@/assets/image/logo.png";
import Input from "@/common/form/Input";
import { Button, CircularProgress } from "@mui/material";
import GoogleIcon from "@/common/icons/GoogleIcon";
import CheckBox from "@/common/form/CheckBox";
import { Link } from "react-router-dom";
import routes from "@/navigation/routes";
import { useLoginUserMutation, useGoogleLoginMutation } from "@/api/apiSlice"; // Update your API slice to include Google login
import { ApiError, loginApiRequest } from "@/types/types";
import userStore from "@/utilities/stores";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";


const schema = Joi.object<loginApiRequest>({
  email: joiSchemas.email.required(),
  password: joiSchemas.password.required(),
}).unknown();

const Login = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<loginApiRequest>({ resolver: joiResolver(schema) });

  const navigate = useNavigate();

  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();

  const onSubmit = handleSubmit(async ({ email: requestEmail, password }) => {
    try {
      const response = await loginUser({
        email: requestEmail,
        password,
      }).unwrap();

      const {
        token,
        user: { first_name, last_name, role, email,id:userId },
      } = response.data;

      const user = {
        name: `${first_name} ${last_name || ''}`,
        email: email,
        id:userId
      };

      // Check if role is valid
      const isValidRole = role === 'admin' || role === 'user' || role === 'rider';

      if (isValidRole) {
        userStore.loginUser(token, user, role);
      } else {
        // Handle invalid roles (e.g., show error, default to 'user')
        console.error('Invalid role:', role);
        userStore.loginUser(token, user, 'user'); // Fallback
      }
      appToast.Success(response?.message || "Successfully logged in");

      // Navigate based on role
      switch (role) {
        case "admin":
          navigate(routes.AdminRoute.ADMIN_DASHBOARD);
          break;
        case "rider":
          navigate(routes.RidersRoute.RIDER_DASHBOARD);
          break;
        default: // regular user
          navigate(routes.usersRoutes.DASHBOARD);
      }
    } catch (error) {
      const typedError = error as ApiError;
      const errorMessage =
        typedError?.data?.message || "Sign In Failed. Please try again.";
      appToast.Error(errorMessage);
    }
  });

  // Google login handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google using the access token
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
        const response = await googleLogin({
          googleToken: tokenResponse.access_token,
          email: userInfo.email,
          name: userInfo.name
        }).unwrap();

        const {
          token,
          user: { first_name, last_name, role, email,id },
        } = response.data;

        const user = {
          name: `${first_name} ${last_name || ''}`,
          email: email,
          id
        };

        // Check if role is valid
        const isValidRole = role === 'admin' || role === 'user' || role === 'rider';

        if (isValidRole) {
          userStore.loginUser(token, user, role); // Safe (no cast needed)
        } else {
          // Handle invalid roles (e.g., show error, default to 'user')
          console.error('Invalid role:', role);
          userStore.loginUser(token, user, 'user'); // Fallback
        }
        appToast.Success(response?.message || "Successfully logged in with Google");

        // Navigate based on role
        switch (role) {
          case "admin":
            navigate(routes.AdminRoute.ADMIN_DASHBOARD);
            break;
          case "rider":
            navigate(routes.RidersRoute.RIDER_DASHBOARD);
            break;
          default: // regular user
            navigate(routes.usersRoutes.DASHBOARD);
        }

      } catch (error) {
        console.error('Google login error:', error);
        const typedError = error as ApiError;
        const errorMessage =
          typedError?.data?.message || "Google Sign-In failed. Please try again.";
        appToast.Error(errorMessage);
      }
    },
    onError: () => {
      appToast.Error("Google Sign-In failed. Please try again.");
    },
  });

  const isLoading = isLoginLoading || isGoogleLoading;

  return (
    <div className="h-screen bg-successActiveColorLight">
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
            <h1 className="text-2xl font-bold">Welcome Favourite Human!</h1>
            <p className="text-gray-600">Please enter your details</p>
          </div>

          <form onSubmit={onSubmit}>
            <Input
              placeholder="Email"
              name="email"
              register={register}
              error={errors.email}
              type="email"
            />
            <Input
              placeholder="Password"
              name="password"
              register={register}
              error={errors.password}
              type="password"
              showPasswordToggle
            />

            <div className="my-4 flex items-center justify-between">
              <CheckBox
                id="rememberMe"
                label="Remember me"
                register={register}
              />
              <p className="text-sm font-bold text-gray-600">
                <Link to={routes.FORGOT_PASSWORD_PAGE}>Forget Password</Link>
              </p>
            </div>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              {isLoginLoading ? (
                <>
                  <CircularProgress size={24} color="inherit" />
                  &nbsp;Processing...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="my-4 text-center text-base md:text-lg">
              Don't have an account?{" "}
              <span className="font-bold">
                <Link to={routes.REGISTER_PAGE}>Sign Up</Link>
              </span>
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
              onClick={() => handleGoogleLogin()}
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

export default Login;