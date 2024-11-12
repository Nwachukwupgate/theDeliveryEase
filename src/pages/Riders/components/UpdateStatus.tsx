import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, CircularProgress } from '@mui/material';
import { appToast } from "@/utilities/appToast";
import { useUpdateDeliveryStatusMutation } from "@/api/apiSlice"; // Adjust the import path
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { ApiError } from "@/types/types";


// Define the valid statuses
const deliveryStatuses = ["Pending", "Dispatched", "In Transit", "Delivered"];

// Define the validation schema
const schema = Joi.object({
  status: Joi.string().valid(...deliveryStatuses).required(),
  location: Joi.string().min(3).required()
});

interface UpdateStatusForm {
  status: string;
  location: string;
}

const UpdateStatus: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pageId = parseInt(id || '0', 10); 
  const { register, handleSubmit, formState: { errors } } = useForm<UpdateStatusForm>({
    resolver: joiResolver(schema),
  });

  const [updateDeliveryStatus, { isLoading }] = useUpdateDeliveryStatusMutation();

  const onSubmit = handleSubmit(async (data) => {
    console.log("data for location", data)
    try {
      const response = await updateDeliveryStatus({ id: pageId, status: data.status, location: data.location }).unwrap();
      appToast.Success(response.message);
    } catch (error) {
      const typedError = error as ApiError;
      const errorMessage = typedError?.data?.message || "Failed to update status. Please try again.";
      appToast.Error(errorMessage);
    }
  });

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Update Delivery Status</h2>
      <form onSubmit={onSubmit}>
        <select {...register("status")} className="mb-4 border p-2 rounded">
          <option value="">Select status</option>
          {deliveryStatuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {errors.status && <span className="text-red-500">{errors.status.message}</span>}

        <input 
          type="text" 
          {...register("location")} 
          placeholder="Enter location" 
          className="mb-4 border p-2 rounded w-full"
        />
        {errors.location && <span className="text-red-500">{errors.location.message}</span>}
        
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Update Status"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateStatus;
