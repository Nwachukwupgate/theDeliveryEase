import Joi from "joi";
import { joiSchemas } from "@/utilities/schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { appToast } from "@/utilities/appToast";
import Icon from '@/assets/image/logo.png';
import Input from "@/common/form/Input";
import { Button, CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom'; 
import routes from '@/navigation/routes';
import { useForgotPasswordMutation } from "@/api/apiSlice";
import { ApiError } from "@/types/types";
import { useNavigate } from "react-router-dom";


interface SignupReq {
  email: string;
}

const schema = Joi.object<SignupReq>({
  email: joiSchemas.email
});

const ForgotPassword = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupReq>({ resolver: joiResolver(schema) });
  const navigate = useNavigate()


  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
    try {
      const response = await forgotPassword({
        email: data.email,
      }).unwrap();
      appToast.Success(response?.message);
      navigate(routes.RESET_PASSWORD_PAGE)
    } catch (error) {
      const typedError = error as ApiError;   
      const errorMessage = typedError?.data?.message || "Verification Failed. Please try again.";     
      appToast.Error(errorMessage)
    }
  });

  return (
    <div className="h-screen bg-successActiveColorLight">
      {/* Image at the top */}
      <div className="p-6 mb-4 md:my-auto">
        <img src={Icon} alt="Delivery Logo" className="w-auto h-6 sm:h-4 lg:h-12" />
      </div>

        <div className="flex flex-col items-center justify-center h-[80%] mx-2 lg:mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md lg:max-w-lg">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <p className="text-gray-600">Don't worry it happens to the best of us</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="mb-8">
                    <Input
                        placeholder="Email"
                        name="email"
                        register={register}
                        error={errors.email}
                        type="email"
                    />
                  </div>

                  <div className="my-2">
                      <Button fullWidth type="submit"> 
                        {isLoading ? (
                          <>
                            <CircularProgress size={24} color="inherit" />  {/* Show spinner */}
                            &nbsp;Processing...  {/* Optional text update */}
                          </>
                        ) : (
                          'Send Link'
                        )}
                      </Button>               
                  </div>
                  
                  <div className="flex justify-center my-4">
                      <p className="text-sm text-gray-600">Back to <Link to={routes.LOGIN}><span className="font-bold">Sign In</span></Link> </p>
                  </div>
                    
                                  
                </form>
            </div>
        </div>
      
    </div>
  );
};

export default ForgotPassword;