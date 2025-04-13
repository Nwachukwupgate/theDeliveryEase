import IconInput from "@/common/form/IconInput";
import SelectDropdown from "@/common/form/SelectDropdown";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import NameIcon from "@/common/icons/NameIcon";
import PhoneIcon from "@/common/icons/PhoneIcon";
import ProductNameIcon from "@/common/icons/ProductNameIcon";
import ProductDescriptionIcon from "@/common/icons/ProductDescriptionIcon";
import WeightIcon from "@/common/icons/WeightIcon";
import QuantityIcon from "@/common/icons/QuantityIcon";
import WalletIcon from "@/common/icons/WalletIcon";
import { DeliveryReq } from "@/types/types";
import { DeliveryType } from "@/utilities/constants";
import { useState } from "react";
import MapboxAutocomplete from "@/components/tracker/MapBoxAutoComplete"; // Import the new component

// Replace with your Mapbox access token
const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const DeliveryForm: React.FC<{ onSubmit: (data: DeliveryReq) => void }> = ({
  onSubmit,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm<DeliveryReq>();

  const [pickupCoordinates, setPickupCoordinates] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

  const [deliveryCoordinates, setDeliveryCoordinates] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

  const handlePickupSelect = (place: any) => {
    if (place) {
      setValue('pickup_address', place.formatted_address || '');
      if (place.geometry?.location) {
        setPickupCoordinates({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
      }
    } else {
      setValue('pickup_address', '');
      setPickupCoordinates({ latitude: null, longitude: null });
    }
  };

  const handleDeliverySelect = (place: any) => {
    if (place) {
      setValue('delivery_address', place.formatted_address || '');
      if (place.geometry?.location) {
        setDeliveryCoordinates({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
      }
    } else {
      setValue('delivery_address', '');
      setDeliveryCoordinates({ latitude: null, longitude: null });
    }
  };

  const onSubmitHandler = (data: DeliveryReq) => {
    const finalData = {
      ...data,
      pickup_lat: pickupCoordinates.latitude,
      pickup_long: pickupCoordinates.longitude,
      delivery_lat: deliveryCoordinates.latitude,
      delivery_long: deliveryCoordinates.longitude,
    };
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="bg-white p-4 lg:p-8">
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
        <div>
          <label htmlFor="pickup_address" className="block text-sm font-medium text-gray-700">
            Pickup Address
          </label>
          <MapboxAutocomplete
            apiKey={mapboxToken}
            placeholder="Pickup Address"
            onPlaceSelected={handlePickupSelect}
            onInputChange={(value) => {
              setValue('pickup_address', value);
              setPickupCoordinates({ latitude: null, longitude: null });
            }}
            className={`w-full rounded-3xl border px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.pickup_address
                ? "border-error bg-errorBg placeholder-errorLight"
                : "border-gray-300 bg-primaryActiveColorLight hover:border-gray-400"
            }`}
            country="ng" // Nigeria
          />
          {errors.pickup_address && (
            <p className="mt-1 text-red-500 text-sm">{errors.pickup_address.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="delivery_address" className="block text-sm font-medium text-gray-700">
            Delivery Address
          </label>
          <MapboxAutocomplete
            apiKey={mapboxToken}
            placeholder="Delivery Address"
            onPlaceSelected={handleDeliverySelect}
            onInputChange={(value) => {
              setValue('delivery_address', value);
              setDeliveryCoordinates({ latitude: null, longitude: null });
            }}
            className={`w-full rounded-3xl border px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.delivery_address
                ? "border-error bg-errorBg placeholder-errorLight"
                : "border-gray-300 bg-primaryActiveColorLight hover:border-gray-400"
            }`}
            country="ng" // Nigeria
          />
          {errors.delivery_address && (
            <p className="mt-1 text-red-500 text-sm">{errors.delivery_address.message}</p>
          )}
        </div>

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
        <SelectDropdown
          label="Delivery Type"
          name="delivery_type"
          register={register}
          error={errors.delivery_type}
          options={[
            { value: DeliveryType.SAME_DAY, label: "Same Day" },
            { value: DeliveryType.NEXT_DAY, label: "Next Day" },
            { value: DeliveryType.SCHEDULED, label: "Scheduled" },
            { value: DeliveryType.EXPRESS, label: "Express" },
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