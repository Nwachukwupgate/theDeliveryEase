import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, CircularProgress } from '@mui/material';
import { appToast } from "@/utilities/appToast";
import { useUpdateDeliveryStatusMutation } from "@/api/apiSlice"; // Adjust the import path
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { ApiError } from "@/types/types";
import { DeliveryStatus } from '@/utilities/constants';

// Define the validation schema
const schema = Joi.object({
  status: Joi.string().valid(
    DeliveryStatus.PENDING,
    DeliveryStatus.DISPATCHED,
    DeliveryStatus.IN_TRANSIT,
    DeliveryStatus.DELIVERED
  ).required(),
});

interface UpdateStatusForm {
  status: string;
}

const UpdateStatus: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pageId = parseInt(id || '0', 10);
  
  const { register, handleSubmit, formState: { errors } } = useForm<UpdateStatusForm>({
    resolver: joiResolver(schema),
  });
  
  const [updateDeliveryStatus, { isLoading }] = useUpdateDeliveryStatusMutation();
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updateDeliveryStatus({ 
        id: pageId, 
        status: data.status 
      }).unwrap();
      
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select 
            {...register("status")} 
            className="border p-2 rounded w-full"
          >
            <option value="">Select status</option>
            <option value={DeliveryStatus.PENDING}>{DeliveryStatus.PENDING}</option>
            <option value={DeliveryStatus.DISPATCHED}>{DeliveryStatus.DISPATCHED}</option>
            <option value={DeliveryStatus.IN_TRANSIT}>{DeliveryStatus.IN_TRANSIT}</option>
            <option value={DeliveryStatus.DELIVERED}>{DeliveryStatus.DELIVERED}</option>
          </select>
          {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
        </div>
        
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