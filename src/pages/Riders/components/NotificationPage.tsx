import DeliveryIcon from "@/common/icons/DeliveryIcon";
import { useGetNotificationQuery } from "@/api/apiSlice";
import moment from 'moment';


// Define the type for notifications
type Notification = {
  id: number;
  title: string;
  message: string;
  created_at: string;
  status: string;
};


// Function to determine status color based on the status
const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "#22D01F"; // Green for approved
    case "Cancelled":
      return "#F60D0D"; // Red for cancelled
    case "Pending":
      return "#FBBF24"; // Yellow for pending
    default:
      return "#667085"; // Default color (e.g., gray)
  }
};

const NotificationPage: React.FC = () => {
  const { data } = useGetNotificationQuery()
  return (
    <div>
      <div className="w-2/4 bg-white p-6">
        <h2 className="font-bold text-xl mb-6">Notification</h2>

        {data?.notifications?.map((notification: Notification) => (
          <div key={notification.id} className="my-4">
            <div className="flex justify-between">
              <div className="flex gap-x-6">
                <div>
                  <DeliveryIcon />
                </div>

                <div>
                  <div className="font-bold">{notification.title}</div>

                  <div className="text-[#667085]">{notification.message}</div>

                  <div className="text-[#667085]">{notification.created_at ? moment(notification.created_at).format("YYYY-MM-DD") : "N/A"}</div>
                </div>
              </div>

              {/* Conditionally apply color based on status */}
              <div className="text" style={{ color: getStatusColor(notification.status) }}>
                {notification.status}
              </div>
            </div>
            <div className="w-full border border-dashed my-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
