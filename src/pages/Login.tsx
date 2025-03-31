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
import { useLoginUserMutation } from "@/api/apiSlice";
import { ApiError, loginApiRequest } from "@/types/types";
import userStore from "@/utilities/stores";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface GoogleUser {
  email: string;
  name: string;
}

interface ApiResponse {
  data: {
    token: string;
    user: {
      first_name: string;
      email: string;
    };
  };
  message: string;
}

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

  console.log(errors);

  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = handleSubmit(async ({ email: requestEmail, password }) => {
    try {
      const response = await loginUser({
        email: requestEmail,
        password,
      }).unwrap();
      console.log("response", response);

      const {
        token,
        user: { first_name, last_name, role, email },
      } = response.data;

      const user = {
        name: `${first_name} ${last_name}`,
        email: email,
      };

      userStore.loginUser(token, user, role);
      appToast.Success(response?.message);
      navigate(routes.usersRoutes.DASHBOARD);
    } catch (error) {
      const typedError = error as ApiError;
      console.log("typedError", typedError);
      const errorMessage =
        typedError?.data?.message || "Sign Up Failed. Please try again.";
      appToast.Error(errorMessage);
    }
  });

  const onGoogleSuccess = async (response: any) => {
    try {
      // Decode JWT response and extract user information
      const { credential } = response;
      const googleUser: GoogleUser = jwtDecode<GoogleUser>(credential); // Specify type for jwt_decode

      // Send user data to backend for further processing
      const apiResponse: ApiResponse = await loginUser({
        email: googleUser.email,
      }).unwrap();

      const token = apiResponse.data?.token;
      const user = {
        email: apiResponse.data.user?.email,
      };
      userStore.loginUser(token, user, "user");
      appToast.Success(apiResponse?.message);
      navigate(routes.usersRoutes.DASHBOARD);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Google Sign-In failed. Please try again.";
      appToast.Error(errorMessage);
    }
  };

  const onGoogleFailure = () => {
    // console.error("Google Sign-In Error", error);
    appToast.Error("Google Sign-In failed. Please try again.");
  };

  const login = useGoogleLogin({
    onSuccess: onGoogleSuccess,
    onError: onGoogleFailure,
  });

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
                {" "}
                <Link to={routes.FORGOT_PASSWORD_PAGE}>Forget Password</Link>
              </p>
            </div>

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
                  &nbsp;Processing... {/* Optional text update */}
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="my-4 text-center text-base md:text-lg">
              Don't have an account?{" "}
              <span className="font-bold">
                {" "}
                <Link to={routes.REGISTER_PAGE}>Sign Up</Link>
              </span>{" "}
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
              onClick={() => login()}
            >
              Continue with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
