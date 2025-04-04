import IconInput from "@/common/form/IconInput";
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@mui/material";
import NameIcon from "@/common/icons/NameIcon"
import PhoneIcon from "@/common/icons/PhoneIcon"
import AddressIcon from "@/common/icons/AddressIcon"
import QuantityIcon from "@/common/icons/QuantityIcon"
import { useCreateRiderMutation } from "@/api/apiSlice";
import { ApiError, RegisterApiRequest } from "@/types/types";
import { appToast } from "@/utilities/appToast";
import Joi from "joi";
import { joiSchemas } from "@/utilities/schema";
import { joiResolver } from "@hookform/resolvers/joi";


const schema = Joi.object<RegisterApiRequest>({
    first_name: joiSchemas.first_name,
    last_name: joiSchemas.last_name,
    email: joiSchemas.email,
    phone: joiSchemas.phone,
    password: joiSchemas.password,
    password_confirmation: joiSchemas.confirmPassword,
});

const RiderForm: React.FC = () => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<RegisterApiRequest>({ resolver: joiResolver(schema) });

    console.log(errors);
    

    const [createRider, { isLoading }] = useCreateRiderMutation()

    const onSubmit = handleSubmit(async ({ email, first_name, last_name, password, password_confirmation, phone }) => {
        try {
            const response = await createRider({
                first_name,
                last_name,
                email,
                password,
                phone,
                password_confirmation
            }).unwrap();
            appToast.Success(response?.message);
            reset()
        } catch (error) {
            const typedError = error as ApiError;
            const errorMessage = typedError?.data?.message || "Create rider failed. Please try again.";
            appToast.Error(errorMessage)
        }
    });

    return (
        <form className="bg-white p-8" onSubmit={onSubmit}>
            <div>
                <h3 className="font-bold text-lg mb-4">Create Riders</h3>
                <div className="grid grid-cols-2 gap-8">

                    <IconInput
                        placeholder="Rider First Name"
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
                        type="tel"
                    />

                    <IconInput
                        placeholder="Email"
                        name="email"
                        register={register}
                        error={errors.email}
                        icon={<AddressIcon />}
                        type="email"
                    />

                    <IconInput
                        placeholder="Password"
                        name="password"
                        register={register}
                        error={errors.password}
                        icon={<QuantityIcon />}
                        type="password"
                        showPasswordToggle
                    />
                    <IconInput
                        placeholder="Confirm Password"
                        name="password_confirmation"
                        register={register}
                        error={errors.password_confirmation}
                        icon={<QuantityIcon />}
                        type="password"
                        showPasswordToggle
                    />

                </div>
            </div>

            <div className="flex justify-center mt-4">
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "250px" }}
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
