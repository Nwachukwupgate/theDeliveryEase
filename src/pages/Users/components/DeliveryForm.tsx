import IconInput from "@/common/form/IconInput";
import SelectDropdown from "@/common/form/SelectDropdown";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import NameIcon from "@/common/icons/NameIcon";
import PhoneIcon from "@/common/icons/PhoneIcon";
import AddressIcon from "@/common/icons/AddressIcon";
import UnknownIcon from "@/common/icons/UnknownIcon";
import ProductNameIcon from "@/common/icons/ProductNameIcon";
import ProductDescriptionIcon from "@/common/icons/ProductDescriptionIcon";
import WeightIcon from "@/common/icons/WeightIcon";
import QuantityIcon from "@/common/icons/QuantityIcon";
import WalletIcon from "@/common/icons/WalletIcon";
import { DeliveryReq } from "@/types/types";

const DeliveryForm: React.FC<{ onSubmit: (data: DeliveryReq) => void }> = ({
  onSubmit,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DeliveryReq>();

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 lg:p-8">
      <div>
        <h3 className="mb-4 text-lg font-bold">Contact Details</h3>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <IconInput
            placeholder="Your Name"
            name="contact_name"
            register={register}
            error={errors.contact_name}
            icon={<NameIcon />}
          />

          <IconInput
            placeholder="Receiver Name"
            name="receiver_name"
            register={register}
            error={errors.receiver_name}
            icon={<NameIcon />}
          />

          <IconInput
            placeholder="Phone Number"
            name="contact_phone"
            register={register}
            error={errors.contact_phone}
            icon={<PhoneIcon />}
          />

          <IconInput
            placeholder="Receiver Number"
            name="receiver_phone"
            register={register}
            error={errors.receiver_phone}
            icon={<PhoneIcon />}
          />
        </div>
      </div>

      <h3 className="mt-4 text-lg font-bold">Delivery Details</h3>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <IconInput
          placeholder="Pickup Address"
          name="pickup_address"
          register={register}
          error={errors.pickup_address}
          icon={<AddressIcon />}
        />

        <IconInput
          placeholder="Delivery Address"
          name="delivery_address"
          register={register}
          error={errors.delivery_address}
          icon={<UnknownIcon />}
        />

        <IconInput
          placeholder="Product Name"
          name="product_name"
          register={register}
          error={errors.product_name}
          icon={<ProductNameIcon />}
        />

        <IconInput
          placeholder="Product Description"
          name="product_description"
          register={register}
          error={errors.product_description}
          icon={<ProductDescriptionIcon />}
        />

        <IconInput
          placeholder="Weight (e.g., 2.5kg)"
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

      <h3 className="mt-4 text-lg font-bold">Delivery & Payment Type</h3>

      <div className="my-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* <SelectDropdown
          label="Payment Option"
          name="payment_option"
          register={register}
          error={errors.payment_option}
          options={[{ value: "Bank Transfer", label: "Bank Transfer" }]}
          icon={<WalletIcon />}
        /> */}

        <SelectDropdown
          label="Delivery Type"
          name="delivery_type"
          register={register}
          error={errors.delivery_type}
          options={[
            { value: "next_day", label: "Next Day Delivery" },
            { value: "same_day", label: "Same Day Delivery" },
            { value: "express", label: "Express Delivery" },
            { value: "scheduled", label: "Scheduled Delivery" },
          ]}
          icon={<WalletIcon />}
        />
      </div>

      <Button fullWidth type="submit" variant="contained">
        Proceed
      </Button>
    </form>
  );
};

export default DeliveryForm;
