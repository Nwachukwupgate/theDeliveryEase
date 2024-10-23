import Joi from "joi";
import Input from "@/common/form/Input";
import { joiSchemas } from "@/utilities/schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@mui/material";
import { useChangePasswordMutation } from "@/api/apiSlice";
import { ApiError } from "@/types/types";
import { appToast } from "@/utilities/appToast";
import { useNavigate } from "react-router-dom";
import routes from '@/navigation/routes';



interface PasswordtReq {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const schema = Joi.object<PasswordtReq>({
    currentPassword: joiSchemas.password,
    newPassword: joiSchemas.password,
    confirmPassword: joiSchemas.password,
  });

const ChangePassword = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<PasswordtReq>({ resolver: joiResolver(schema) });

    const navigate = useNavigate();

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const onSubmit = handleSubmit(async (data) => {
        try {
        const response = await changePassword({
            current_password: data.currentPassword,
            new_password: data.newPassword,
            new_password_confirmation: data.confirmPassword,
        }).unwrap(); 
        appToast.Success(response?.message);
        navigate(routes.LOGIN)
        } catch (error) {
        const typedError = error as ApiError;   
        const errorMessage = typedError?.data?.message || "Sign Up Failed. Please try again.";     
        appToast.Error(errorMessage)
        }
    });
  return (
    <>
        <div className="my-8">
            <div> 
                <p className="font-bold text-xl">Password</p> 
                <p className="text-[#667085]">Please enter your current password to change your password.</p>
            </div>
        </div>

        <form onSubmit={onSubmit}>
            <div>
                <div className="w-full border my-4"></div>
                <div className="flex justify-between items-center">
                    <div>
                        Current Password
                    </div>

                    <div className="basis-9/12">
                        <Input
                            placeholder="Current Password"
                            name="currentPassword"
                            register={register}
                            error={errors.currentPassword}
                            type="text"
                        />
                    </div>
                    
                </div> 
            </div>

            <div>
                <div className="w-full border my-4"></div>
                <div className="flex justify-between items-center">
                    <div>
                        New Password
                    </div>

                    <div className="basis-9/12">
                        <Input
                            placeholder="New Password"
                            name="newPassword"
                            register={register}
                            error={errors.newPassword}
                            type="text"
                        />
                    </div>
                    
                </div> 
            </div>

            <div>
                <div className="w-full border my-4"></div>
                <div className="flex justify-between items-center">
                    <div>
                        Confirm New Password
                    </div>

                    <div className="basis-9/12">
                        <Input
                            placeholder="Confirm New Password"
                            name="confirmPassword"
                            register={register}
                            error={errors.confirmPassword}
                            type="text"
                        />
                    </div>
                    
                </div> 
            </div>

            <div className="flex justify-end">
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
                'Update Password'
                )}
            </Button>
            </div> 
        </form>
    </>
  )
}

export default ChangePassword