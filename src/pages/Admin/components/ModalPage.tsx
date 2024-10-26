import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { Button, CircularProgress } from "@mui/material";
import SelectDropdown from "@/common/form/SelectDropdown";
import { useGetBikersQuery, useAssignRiderMutation } from "@/api/apiSlice";
import { useForm } from "react-hook-form";
import { appToast } from "@/utilities/appToast";
import { ApiError } from "@/types/types";

  
  interface ModalPageProps {
    isOpen: boolean;
    onClose: () => void;
    deliveryId: string | null; // Pass deliveryId as a prop
  }

  interface Rider {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }
  
  interface DeliveryReq {
    rider_id: string; // Form will submit the rider_id
  }
  
  const ModalPage: React.FC<ModalPageProps> = ({ isOpen, onClose, deliveryId }) => {
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<DeliveryReq>();
    
    console.log("delivery id", deliveryId)
    // Fetch the list of bikers using the API slice
    const { data: ridersData } = useGetBikersQuery();
  
    // Mutation to assign a rider to the delivery
    const [assignRider, { isLoading }] = useAssignRiderMutation();
  
    // Submit handler
    const onSubmit = async (formData: DeliveryReq) => {
        console.log("delivery id", deliveryId)
        try {
          if (!deliveryId) {
            console.error("Delivery ID is null");
            return; 
          }
      
          const response = await assignRider({
            delivery_id: deliveryId,
            rider_id: parseInt(formData.rider_id),
          }).unwrap();
          appToast.Success(response?.message);
          onClose();
        } catch (error) {
            const typedError = error as ApiError;   
            const errorMessage = typedError?.data?.message || "Sign Up Failed. Please try again.";     
            appToast.Error(errorMessage)
        }
    };
  
    // Generate options from the fetched riders data
    const riderOptions =
      ridersData?.riders?.map((rider: Rider) => ({
        value: rider.id.toString(), // Rider's ID as value
        label: `${rider.first_name} ${rider.last_name}`, // Full name as the label
      })) || [];
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Rider</DialogTitle>
            <DialogDescription>Assign a rider to the selected delivery.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <SelectDropdown
                  label="Select Biker"
                  name="rider_id"
                  register={register}
                  error={errors.rider_id}
                  options={riderOptions}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={24} color="inherit" /> {/* Show spinner */}
                    &nbsp;Processing...
                  </>
                ) : (
                  'Assign'
                )}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outlined" onClick={onClose}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ModalPage;
  