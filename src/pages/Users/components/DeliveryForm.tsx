import IconInput from "@/common/form/IconInput";
import SelectDropdown from "@/common/form/SelectDropdown"
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@mui/material";
import NameIcon from "@/common/icons/NameIcon"
import PhoneIcon from "@/common/icons/PhoneIcon"
import AddressIcon from "@/common/icons/AddressIcon"
import UnknownIcon from "@/common/icons/UnknownIcon"
import ProductNameIcon from "@/common/icons/ProductNameIcon"
import ProductDescriptionIcon from "@/common/icons/ProductDescriptionIcon"
import WeightIcon from "@/common/icons/WeightIcon"
import QuantityIcon from "@/common/icons/QuantityIcon"
import WalletIcon from "@/common/icons/WalletIcon"
import { appToast } from "@/utilities/appToast";

interface DeliveryReq {
    name: string;
    recieverName: string;
    phoneNumber: string;
    recieverNumber: string;
    pickupAddress: string;
    deliveryAddress: string;
    productName: string;
    productDescription: string;
    weight: string;
    quantity: string;
    type: string;
}

const DeliveryForm: React.FC<{ onSubmit: (data: DeliveryReq) => void }> = ({ onSubmit }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<DeliveryReq>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8">
            <div>
                <h3 className="font-bold text-lg mb-4">Contact Details</h3>
                <div className="grid grid-cols-2 gap-8">
                    
                    <IconInput 
                        placeholder="Your Name"
                        name="name"
                        register={register}
                        error={errors.name}
                        icon={<NameIcon />}
                    />

                    <IconInput 
                        placeholder="Receiver Name"
                        name="recieverName"
                        register={register}
                        error={errors.recieverName}
                        icon={<NameIcon />}
                    />

                    <IconInput 
                        placeholder="Phone Number"
                        name="phoneNumber"
                        register={register}
                        error={errors.phoneNumber}
                        icon={<PhoneIcon />}
                    />

                    <IconInput 
                        placeholder="Reciever Number"
                        name="recieverNumber"
                        register={register}
                        error={errors.recieverNumber}
                        icon={<PhoneIcon />}
                    />
                </div>
            </div>

            <h3 className="font-bold text-lg">Delivery Details</h3>

            <div className="grid grid-cols-2 gap-8 mt-6">
                <IconInput 
                    placeholder="Pickup Address"
                    name="pickupAddress"
                    register={register}
                    error={errors.pickupAddress}
                    icon={<AddressIcon />}
                />

                <IconInput 
                    placeholder="Delivery Address"
                    name="deliveryAddress"
                    register={register}
                    error={errors.deliveryAddress}
                    icon={<UnknownIcon />}
                />

                <IconInput 
                    placeholder="Product Name"
                    name="productName"
                    register={register}
                    error={errors.productName}
                    icon={<ProductNameIcon />}
                />

                <IconInput 
                    placeholder="Product Description"
                    name="productDescription"
                    register={register}
                    error={errors.productDescription}
                    icon={<ProductDescriptionIcon />}
                />

                <IconInput 
                    placeholder="Weight"
                    name="weight"
                    register={register}
                    error={errors.weight}
                    icon={<WeightIcon />}
                />

                <IconInput 
                    placeholder="Quantity"
                    name="quantity"
                    register={register}
                    error={errors.quantity}
                    icon={<QuantityIcon />}
                />
            </div>

            <h3 className="font-bold text-lg mt-2">Delivery & Payment Type</h3>

            <div className="grid grid-cols-2 gap-8 my-6">
                <SelectDropdown 
                    label="Delivery Option"
                    name="deliveryOption"
                    register={register}
                    error={errors.type}
                    options={[
                        { value: "Card Payment", label: "Card Payment" },
                    ]}
                    icon={<WalletIcon />}
                />              
            </div>

            {/* You can add more fields for lastName, email, etc. */}
            <Button 
                fullWidth 
                type="submit" 
                variant="contained"
                // disabled={isLoading}  // Disable the button while loading
            >
                Proceed
            </Button>
        </form>
    );
}

export default DeliveryForm;
