import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appToast } from "@/utilities/appToast";
import { useCreateDeliveryMutation } from "@/api/apiSlice";
import { ApiError } from "@/types/types";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface DeliveryData {
  contact_name: string;
  contact_phone: string;
  receiver_name: string;
  receiver_phone: string;
  pickup_address: string;
  delivery_address: string;
  delivery_type: string;
  product_name: string;
  product_description: string;
  weight: string;
  quantity: string;
}

const bankName = import.meta.env.VITE_APP_BANK_NAME;
const bankAcc = import.meta.env.VITE_APP_BANK_ACC;

const CheckoutCard: React.FC<{ deliveryData: DeliveryData }> = ({
  deliveryData,
}) => {
  const navigate = useNavigate();
  const [createDelivery] = useCreateDeliveryMutation();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCompleteDelivery = async () => {
    try {
      // Create the delivery without payment information
      const response = await createDelivery({
        contact_name: deliveryData?.contact_name || "",
        contact_phone: deliveryData?.contact_phone || "",
        receiver_name: deliveryData?.receiver_name || "",
        receiver_phone: deliveryData?.receiver_phone || "",
        pickup_address: deliveryData?.pickup_address || "",
        delivery_address: deliveryData?.delivery_address || "",
        delivery_type: deliveryData?.delivery_type || "Standard",
        product_name: deliveryData?.product_name || "",
        product_description: deliveryData?.product_description || "",
        weight: deliveryData?.weight || "",
        quantity: deliveryData?.quantity || "",
        // Omitting price and receipt for now
      }).unwrap();

      appToast.Success(response?.message || "Delivery created successfully!");
      setDialogOpen(false);
      navigate("/history");
    } catch (error) {
      const typedError = error as ApiError;
      const errorMessage =
        typedError?.data?.message ||
        "Failed to create delivery. Please try again.";
      appToast.Error(errorMessage);
    }
  };

  return (
    <>
      <div className="w-full bg-white p-4 lg:p-8">
        <div className="space-y-8">
          <p className="text-xl font-bold">Delivery Summary</p>
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-4">
              <p>Product Name</p>{" "}
              <p className="font-bold">{deliveryData?.product_name}</p>
            </div>
            <div className="flex gap-4">
              <p>Description</p>{" "}
              <p className="font-bold">{deliveryData?.product_description}</p>
            </div>
            <div className="flex gap-4">
              <p>Quantity</p>{" "}
              <p className="font-bold">{deliveryData?.quantity}</p>
            </div>
            <div className="flex gap-4">
              <p>Weight</p> <p className="font-bold">{deliveryData?.weight}</p>
            </div>
            <div className="flex gap-4">
              <p>Delivery Type</p>{" "}
              <p className="font-bold">
                <span className="rounded-full bg-[#DDBCDC] px-3 py-1 text-sm text-[#330E32]">
                  {deliveryData?.delivery_type}
                </span>
              </p>
            </div>
            <div className="flex gap-4">
              <p>Pickup Address</p>{" "}
              <p className="font-bold">{deliveryData?.pickup_address}</p>
            </div>
            <div className="flex gap-4">
              <p>Delivery Address</p>{" "}
              <p className="font-bold">{deliveryData?.delivery_address}</p>
            </div>
          </div>
          <Button
            fullWidth
            variant="contained"
            onClick={handleOpenDialog}
            disabled={!deliveryData}
          >
            Create Delivery
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle className="font-bold">Confirm Delivery</DialogTitle>
        <DialogContent>
          <p className="mb-4">
            You're about to create this delivery request. Would you like to proceed?
          </p>

          <div className="mb-6 rounded bg-[#f1f5f9] p-3 text-sm">
            <p className="mb-2 font-semibold">Pay into this account number:</p>
            <div className="flex items-center justify-between rounded bg-white px-3 py-2 shadow-sm">
              <span className="font-mono text-base">{bankAcc} {bankName}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${bankAcc}`);
                  appToast.Success("Account number copied!");
                }}
                className="ml-2 p-1 text-gray-500 hover:text-black"
                title="Copy"
              >
                <ContentCopyIcon style={{ fontSize: 16 }} />
              </button>
            </div>
            <p className="mt-2 text-gray-600">
              After payment, please{" "}
              <span
                onClick={() => navigate("/contact")}
                className="cursor-pointer text-blue-600 underline hover:text-blue-800"
              >
                contact our sales rep
              </span>{" "}
              to inform them.
            </p>
          </div>

          <div className="mt-4">
            <p className="font-semibold">Delivery Details:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>From: {deliveryData?.pickup_address}</li>
              <li>To: {deliveryData?.delivery_address}</li>
              <li>Product: {deliveryData?.product_name}</li>
              <li>Delivery Type: {deliveryData?.delivery_type}</li>
            </ul>
          </div>
        </DialogContent>


        <div className="flex justify-center gap-4 py-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCompleteDelivery}
          >
            Confirm Delivery
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default CheckoutCard;
