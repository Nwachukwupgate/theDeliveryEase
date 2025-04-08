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



interface ChangePasswordReq {
    current_password: string,
    new_password: string,
    new_password_confirmation: string
}

const schema = Joi.object<ChangePasswordReq>({
    current_password: joiSchemas.old_password.required(),
    new_password: joiSchemas.new_password.required(),
    new_password_confirmation: joiSchemas.confirm_new_password.required()
});

const ChangePassword = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ChangePasswordReq>({ resolver: joiResolver(schema) });

    const navigate = useNavigate();

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const onSubmit = handleSubmit(async ({ current_password, new_password, new_password_confirmation }) => {
        try {
            const response = await changePassword({
                current_password, new_password, new_password_confirmation
            }).unwrap();
            appToast.Success(response?.message);
            navigate(routes.LOGIN)
        } catch (error) {
            const typedError = error as ApiError;
            const errorMessage = typedError?.data?.message || "Change password failed. Please try again.";
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
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                        <div className="mb-4 lg:mb-0">
                            Current Password
                        </div>

                        <div className="basis-9/12">
                            <Input
                                placeholder="Current Password"
                                name="current_password"
                                register={register}
                                error={errors.current_password}
                                type="text"
                            />
                        </div>

                    </div>
                </div>

                <div>
                    <div className="w-full border my-4"></div>
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                        <div className="mb-4 lg:mb-0">
                            New Password
                        </div>

                        <div className="basis-9/12">
                            <Input
                                placeholder="New Password"
                                name="new_password"
                                register={register}
                                error={errors.new_password}
                                type="text"
                            />
                        </div>

                    </div>
                </div>

                <div>
                    <div className="w-full border my-4"></div>
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                        <div className="mb-4 lg:mb-0">
                            Confirm New Password
                        </div>

                        <div className="basis-9/12">
                            <Input
                                placeholder="Confirm New Password"
                                name="new_password_confirmation"
                                register={register}
                                error={errors.new_password_confirmation}
                                type="text"
                            />
                        </div>

                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <Button
                        // fullWidth 
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