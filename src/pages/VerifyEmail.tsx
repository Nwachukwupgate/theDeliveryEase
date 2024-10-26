import Joi from "joi";
import { codeSchemas } from "@/utilities/schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { appToast } from "@/utilities/appToast";
import Icon from '@/assets/image/logo.png';
import Input from "@/common/form/Input";
import { Button, CircularProgress } from "@mui/material";
import { useVerifyEmailMutation } from "@/api/apiSlice";
import { ApiError } from "@/types/types";
import { useNavigate } from "react-router-dom";
import routes from '@/navigation/routes';

interface SignupReq {
  code: string;
}

const schema = Joi.object<SignupReq>({
  code: codeSchemas.code,
});

const VerifyEmail = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupReq>({ resolver: joiResolver(schema) });
  const navigate = useNavigate()

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
    try {
      await verifyEmail({
        code: data.code,
      }).unwrap();
      appToast.Success("Email Verification Successful");
      navigate(routes.LOGIN)
    } catch (error) {
      const typedError = error as ApiError;   
      const errorMessage = typedError?.data?.message || "Verification Failed. Please try again.";     
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
                <h1 className="text-2xl font-bold">Email Verification</h1>
                <p className="text-gray-600">Please enter the code that was sent to your mail</p>
                </div>

                <form onSubmit={onSubmit}> 
                    <div className="mb-8">              
                        <Input
                            placeholder="Input Code"
                            name="code"
                            register={register}
                            error={errors.code}
                            type="text"
                        />
                    </div>

                    <div className="flex justify-end my-4">
                        <p className="text-sm text-gray-600 font-bold"> Resend Code </p>
                    </div>
                
                    <div className="my-2">
                    <Button 
                      fullWidth 
                      type="submit" 
                      variant="contained"
                      disabled={isLoading}  // Disable the button while loading
                    >
                      {isLoading ? (
                        <>
                          <CircularProgress size={24} color="inherit" />  {/* Show spinner */}
                          &nbsp;Verifying Account...  {/* Optional text update */}
                        </>
                      ) : (
                        'Proceed'
                      )}
                    </Button>               
                    </div>                                  
                                      
                </form>
            </div>
        </div>
      
    </div>
  );
};

export default VerifyEmail;
