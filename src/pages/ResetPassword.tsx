import Joi from "joi";
import { joiSchemas } from "@/utilities/schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { appToast } from "@/utilities/appToast";
import Icon from '@/assets/image/logo.png';
import Input from "@/common/form/Input";
import { Button } from "@mui/material";


interface SignupReq {
  password: string;
  confirmPassword: string
}

const schema = Joi.object<SignupReq>({
  password: joiSchemas.password,
  confirmPassword: joiSchemas.confirmPassword,
});

const ResetPassword = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupReq>({ resolver: joiResolver(schema) });

  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
    appToast.Success("SIGN UP Done");
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
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <p className="text-gray-600">Make sure, you don't forget this time</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="mb-8">
                    <Input
                        placeholder="Password"
                        name="password"
                        register={register}
                        error={errors.password}
                        type="text"
                    />

                    <Input
                        placeholder="Confirm Password"
                        name="confirmpassword"
                        register={register}
                        error={errors.confirmPassword}
                        type="password"
                    />
                  </div>

                  <div className="my-2">
                      <Button fullWidth type="submit"> Send Link </Button>               
                  </div>
                  
                  <div className="flex justify-center my-4">
                      <p className="text-sm text-gray-600">Back to <span className="font-bold">Sign In</span></p>
                  </div>
                    
                                  
                </form>
            </div>
        </div>
      
    </div>
  );
};

export default ResetPassword;