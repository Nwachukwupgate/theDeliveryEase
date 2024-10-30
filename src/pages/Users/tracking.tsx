import { useEffect, useState } from "react";
import DeliveringCard from "./components/DeliveringCard";
import OverviewCard from "./components/OverviewCard";
import { Button, CircularProgress } from "@mui/material";
import PlusIcon from '@/common/icons/PlusIcon'
import { useGetDeliveryHistoryQuery } from "@/api/apiSlice";
import { Delivery } from "@/types/types";
import { Link } from 'react-router-dom'; 
import routes from "@/navigation/routes";


const TrackingPage = () => {
  const { data, isLoading } = useGetDeliveryHistoryQuery({ page: 1 });
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<Delivery | null>(null);


  useEffect(() => {
    if(data) {
      setSelectedDeliveryId(data?.data?.deliveries?.data[0]);
    }
  }, [data])

    return (
        <div className="p-3 lg:p-6">
            <div className="flex justify-between border-b border-gray-400 mb-12 pb-4">
                <div className="font-bold text-lg">Tracking</div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 p-2 lg:p-8">
                {/* Left section with delivery cards */}
                <div className="lg:w-[40%] space-y-6">

                    <Link to={routes.usersRoutes.DELIVERY}>
                      <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<PlusIcon />}
                          className="my-2"
                          size="small"
                          sx={{
                              borderColor :'#751F72',
                              color:'#751F72',
                              }}
                          >
                          New Delivery
                      </Button>
                    </Link>

                    {
                      isLoading ? (
                        <CircularProgress size={"24px"} color="inherit" />
                      ) : (
                      data?.data?.deliveries?.data?.map((delivery) => (
                          <DeliveringCard
                              key={delivery.id}
                              id={delivery.id}
                              delivery={delivery.delivery_address}
                              address={delivery.pickup_address}
                              status={delivery.delivery_status}
                              date={delivery.created_at}
                              selected={delivery.id === selectedDeliveryId?.id}
                              onClick={() => setSelectedDeliveryId(delivery)}
                          />
                      ))
                    )}
                </div>

                {/* Right section with overview */}
                <div className="lg:w-[60%]">
                  <OverviewCard selectedDelivery={selectedDeliveryId}/>
                    {/* <DeliverySteps delivery={selectedDeliveryId} showExtras={false} /> */}
                </div>
            </div>
      </div>
    );
};

export default TrackingPage;
