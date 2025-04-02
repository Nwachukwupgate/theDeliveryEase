import DeliveringCard from "./components/DeliveringCard";
import { useRiderActiveDeliveriesQuery } from "@/api/apiSlice";
import { CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom';

const DeliveriesPage = () => {

  const { data: query, isLoading } = useRiderActiveDeliveriesQuery();
     
  return (
    <div className="p-3 lg:p-6">
      <div className="flex justify-between border-b border-gray-400 mb-12 pb-4">
        <div className="font-bold text-lg">All Deliveries</div>
      </div>

      <div className="my-4 bg-white p-4 rounded-2xl">
        {isLoading ? (
            <CircularProgress size={"24px"} color="inherit" />
          ) : (
            query?.deliveries?.map((delivery) => (
              <Link to={`/rider/${delivery.id}`} key={delivery.code}>
                <DeliveringCard
                  key={delivery.code}
                  id={`${delivery.id}`}
                  delivery={delivery.product_name}
                  address={delivery.pickup_address}
                  status={delivery.delivery_status}
                  date={delivery.created_at}
                  selected={false}
                  showAction={false}
                />
              </Link>
            ))
          )}
      </div>

    </div>
  );
};

export default DeliveriesPage;
