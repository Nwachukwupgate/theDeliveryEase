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
import { useRegisterUserMutation } from "@/api/apiSlice";
import userStore from "@/utilities/stores";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { RegisterApiRequest } from "@/types/types";

interface GoogleUser {
  email: string;
  name: string;
}

interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
}

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

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmit = handleSubmit(async ({email,first_name,last_name,password,password_confirmation,phone}) => {
    try {
      const response = await registerUser({
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
        phone,
      }).unwrap();
      const token = response.data?.token;
      const user = {
        name: response.data.user?.first_name,
        email: response.data.user?.email,
      };
      const userType = "user";
      userStore.loginUser(token, user, userType);
      appToast.Success("Sign Up Successful");
      navigate(routes.VERIFY_EMAIL);
    } catch (error) {
      const typedError = error as ApiError;
      console.log("Full API error:", typedError);
      const errorMessage =
        typedError?.data?.message || "Sign Up Failed. Please try again.";
      appToast.Error(errorMessage);
    }
  });

  const onGoogleSuccess = async (response: any) => {
    try {
      const { credential } = response;
      const googleUser: GoogleUser = jwtDecode<GoogleUser>(credential);

      // Call the registration API with Google details
      const apiResponse = await registerUser({
        first_name: googleUser.name.split(" ")[0],
        last_name: googleUser.name.split(" ")[1] || "",
        email: googleUser.email,
        password: "",
        phone: "",
        password_confirmation: ""
      }).unwrap();

      const token = apiResponse.data?.token;
      const user = { email: apiResponse.data.user?.email };
      userStore.loginUser(token, user, "user");
      appToast.Success("Google Sign-Up Successful");
      navigate(routes.usersRoutes.DASHBOARD);
    } catch (error) {
      const errorMessage =
        (error as ApiError)?.data?.message ||
        "Google Sign-Up failed. Please try again.";
      appToast.Error(errorMessage);
    }
  };

  const onGoogleFailure = () => {
    appToast.Error("Google Sign-Up failed. Please try again.");
  };

  const googleSignup = useGoogleLogin({
    onSuccess: onGoogleSuccess,
    onError: onGoogleFailure,
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
              onClick={() => googleSignup()}
            >
              Continue with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
