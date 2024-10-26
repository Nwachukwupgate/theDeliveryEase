import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { appToast } from "@/utilities/appToast";
import { useCreateDeliveryMutation } from '@/api/apiSlice';
import { ApiError } from '@/types/types';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';



const CheckoutCard: React.FC<{ deliveryData: any }> = ({ deliveryData }) => {
  const navigate = useNavigate();
  const [createDelivery] = useCreateDeliveryMutation()

  const deliveryPrice = deliveryData?.deliveryType === "Next Day Delivery" ? 2000 : 1500;


    // const publicKey = "pk_test_311b7e355abacecbfa3097807660c7109a54659f"
    // if (!deliveryData?.name) return null; // Don't render if there's no data

    // const config = {
    //   reference: (new Date()).getTime().toString(),
    //   email: "user@example.com",
    //   amount: 20000 * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    //   publicKey,
    // };

    const [dialogOpen, setDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCompleteTransaction = async () => {
    if (imageFile) {
      // Add image to createDelivery data and submit
      console.log("Image submitted:", imageFile);
      try{
        const response = await createDelivery({
          contact_name: deliveryData?.name,
          contact_phone: deliveryData?.phoneNumber,
          receiver_name: deliveryData?.recieverName,
          receiver_phone: deliveryData?.recieverNumber,
          pickup_address: deliveryData?.pickupAddress,
          delivery_address: deliveryData?.deliveryAddress,
          delivery_type: deliveryData?.deliveryType,
          product_name: deliveryData?.productName,
          product_description: deliveryData?.productDescription,
          weight: deliveryData?.weight,
          quantity: deliveryData?.quantity,
          price: deliveryPrice.toString(),
          receipt: imageFile,
        }).unwrap(); 
        console.log("response", response)     
        appToast.Success(response?.message);
        setDialogOpen(false);
        navigate('/history');
      } catch (error) {
        const typedError = error as ApiError;   
        const errorMessage = typedError?.data?.message || "Failed. Please try again.";     
        appToast.Error(errorMessage)
      }
    }
  };


    // you can call this function anything
    // const onSuccess = async (reference : string) => {
      
    //   console.log(reference);
    // };

    // you can call this function anything
    // const onClose = () => {
    //   // implementation for  whatever you want to do when the Paystack dialog closed.
    //   console.log('closed')
    // }

    // const initializePayment = usePaystackPayment(config);

    return (
      <>
        <div className="bg-white p-8">
            <div className="space-y-8">
                <p className="font-bold text-xl">Summary</p>
                <div className="flex flex-col gap-y-4">
                    <div className="flex gap-4"><p>Product Name</p> <p className="font-bold">{deliveryData?.productName}</p></div>
                    <div className="flex gap-4"><p>Description</p> <p className="font-bold">{deliveryData?.productDescription}</p></div>
                    <div className="flex gap-4"><p>Quantity</p> <p className="font-bold">{deliveryData?.quantity}</p></div>
                    <div className="flex gap-4"><p>Weight</p> <p className="font-bold">{deliveryData?.weight}</p></div>
                    <div className="flex gap-4"><p>Delivery Type</p> <p className="font-bold"><span className="py-1 px-3 rounded-full text-sm bg-[#DDBCDC] text-[#330E32]">
                        {deliveryData?.deliveryType}
                      </span></p>
                    </div>
                    <div className="flex gap-4"><p>Pickup Address</p> <p className="font-bold">{deliveryData?.pickupAddress}</p></div>
                    <div className="flex gap-4"><p>Delivery Address</p> <p className="font-bold">{deliveryData?.deliveryAddress}</p></div>
                </div>
                <Button 
                  fullWidth 
                  type="submit" 
                  variant="contained"
                  // onClick={() => {
                  //   initializePayment({onSuccess, onClose})
                  // }}
                  onClick={handleOpenDialog}
                  disabled={!deliveryData}  // Disable the button while loading
                >
                  Place Order
              </Button>
            </div>           
        </div>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle className="font-bold">Complete Your Transaction</DialogTitle>
          <DialogContent>
            <p>Please make payment of <strong>₦{deliveryPrice}</strong> to account number <strong>8035327006 (Moniepoint)</strong>.</p>
            <p>After completing the payment, upload a transaction image to finish the process.</p>
            
            <div className="flex flex-col items-center mt-4">
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
              <label htmlFor="imageInput" className="cursor-pointer">
                <Button
                  variant="outlined"
                  component="span"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md px-4 py-2 flex items-center"
                >
                  <ImageIcon className="mr-2" />
                  Upload Transaction Image
                </Button>
              </label>
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover rounded-lg shadow-lg" />
                </div>
              )}
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
              onClick={handleCompleteTransaction}
              disabled={!imageFile}
            >
              Complete Transaction
            </Button>
        </div>
        </Dialog>
      </>
    );
};

export default CheckoutCard;
