import Joi from "joi";
import { joiSchemas } from "@/utilities/schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { appToast } from "@/utilities/appToast";
import Icon from '@/assets/image/logo.png';
import Input from "@/common/form/Input";
import { Button, CircularProgress } from "@mui/material";
import CheckBox from "@/common/form/CheckBox";
import routes from '@/navigation/routes';
import { useLoginUserMutation } from "@/api/apiSlice";
import { ApiError } from "@/types/types";
import userStore from '@/utilities/stores'; 
import { useNavigate } from "react-router-dom";


interface SignupReq {
  email: string;
  password: string;
  rememberMe: boolean;
}

const schema = Joi.object<SignupReq>({
  email: joiSchemas.email,
  password: joiSchemas.password,
  rememberMe: Joi.boolean(),
});

const Login = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupReq>({ resolver: joiResolver(schema) });

  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap(); 
      console.log("response", response)
      const token = response.data?.token;
      const user = { name: response.data.user?.first_name, email: response.data.user?.email };
      const userType = 'rider';
      userStore.loginUser(token, user, userType);
      appToast.Success(response?.message);
      navigate(routes.RidersRoute.RIDER_DASHBOARD)
    } catch (error) {
      const typedError = error as ApiError;   
      const errorMessage = typedError?.data?.message || "Sign In Failed. Please try again.";     
      appToast.Error(errorMessage)
    }
  });


  return (
    <div className="h-screen bg-successActiveColorLight">
      <div className="p-6 mb-4 md:my-auto">
        <img src={Icon} alt="Delivery Logo" className="w-auto h-6 sm:h-4 lg:h-12" />
      </div>

        <div className="flex flex-col items-center justify-center h-[80%] mx-2 lg:mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md lg:max-w-lg">
                <div className="mb-6">
                <h1 className="text-2xl font-bold">Welcome Rider!</h1>
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
                    />

                    <div className="flex justify-between items-center my-4">
                        <CheckBox id="rememberMe" label="Remember me" register={register} />
                        <p className="text-sm font-bold text-gray-600">Forget Password</p>
                    </div>

                    <Button 
                      fullWidth 
                      type="submit" 
                      variant="contained"
                      disabled={isLoading}  // Disable the button while loading
                    >
                      {isLoading ? (
                        <>
                          <CircularProgress size={24} color="inherit" />  {/* Show spinner */}
                          &nbsp;Processing...  {/* Optional text update */}
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                                     
                </form>
            </div>
        </div>
      
    </div>
  );
};

export default Login;
