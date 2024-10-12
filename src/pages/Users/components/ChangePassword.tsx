import Input from "@/common/form/Input";
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@mui/material";


interface PasswordtReq {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ChangePassword = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<PasswordtReq>();
  return (
    <>
        <div className="my-8">
            <div> 
                <p className="font-bold text-xl">Password</p> 
                <p className="text-[#667085]">Please enter your current password to change your password.</p>
            </div>
        </div>

        <form>
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
                            type="password"
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
                            type="password"
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
                            type="password"
                        />
                    </div>
                    
                </div> 
            </div>

            <div className="flex justify-end">
                <Button variant="contained" >
                    Update Password
                </Button>
            </div> 
        </form>
    </>
  )
}

export default ChangePassword