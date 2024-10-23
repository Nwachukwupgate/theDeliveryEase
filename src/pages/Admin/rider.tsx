import IconInput from "@/common/form/IconInput";
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@mui/material";
import NameIcon from "@/common/icons/NameIcon"
import PhoneIcon from "@/common/icons/PhoneIcon"
import AddressIcon from "@/common/icons/AddressIcon"
import QuantityIcon from "@/common/icons/QuantityIcon"
import { useCreateRiderMutation } from "@/api/apiSlice";
import { ApiError } from "@/types/types";
import { appToast } from "@/utilities/appToast";


interface DeliveryReq {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
}

const RiderForm: React.FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<DeliveryReq>();

    const [ createRider, { isLoading }] = useCreateRiderMutation()

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await createRider({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            phone: data.phone
            }).unwrap(); 
            appToast.Success(response?.message);
            reset()
        } catch (error) {
            const typedError = error as ApiError;   
            const errorMessage = typedError?.data?.message || "Sign Up Failed. Please try again.";     
            appToast.Error(errorMessage)
        }
    });

    return (
        <form className="bg-white p-8" onSubmit={onSubmit}>
            <div>
                <h3 className="font-bold text-lg mb-4">Create Riders</h3>
                <div className="grid grid-cols-2 gap-8">
                    
                    <IconInput 
                        placeholder="Bikers First Name"
                        name="first_name"
                        register={register}
                        error={errors.first_name}
                        icon={<NameIcon />}
                    />

                    <IconInput 
                        placeholder="Last Name"
                        name="last_name"
                        register={register}
                        error={errors.last_name}
                        icon={<NameIcon />}
                    />

                    <IconInput 
                        placeholder="Phone Number"
                        name="phone"
                        register={register}
                        error={errors.phone}
                        icon={<PhoneIcon />}
                    />

                    <IconInput 
                        placeholder="Email"
                        name="email"
                        register={register}
                        error={errors.email}
                        icon={<AddressIcon />}
                    />

                    <IconInput 
                        placeholder="Password"
                        name="password"
                        register={register}
                        error={errors.password}
                        icon={<QuantityIcon />}
                    />

                </div>
            </div>

            <div className="flex justify-center mt-4">
                <Button  
                    type="submit" 
                    variant="contained"
                    sx={{width: "250px"}}
                    disabled={isLoading}  
                >
                    {isLoading ? (
                        <>
                          <CircularProgress size={24} color="inherit" /> 
                          &nbsp;Processing...
                        </>
                      ) : (
                        'Save'
                    )}                   
                </Button>
            </div>
            
        </form>
    );
}

export default RiderForm;
