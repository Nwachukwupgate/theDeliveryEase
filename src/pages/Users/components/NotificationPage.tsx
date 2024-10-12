import DeliveryIcon from "@/common/icons/DeliveryIcon";

// Define the type for notifications
type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  status: string;
  statusColor: string;
};

const notifications: Notification[] = [
  {
    id: 1,
    title: "Delivery Arrived",
    description: "Package (ASDU56ERW5) has been delivered to the front desk.",
    time: "1 hour ago",
    status: "Approved",
    statusColor: "#22D01F",
  },
  {
    id: 2,
    title: "Delivery Arrived",
    description: "Package (JKL98QWER2) has been cancelled due to an issue.",
    time: "2 hours ago",
    status: "Cancelled",
    statusColor: "#F60D0D",
  },
  {
    id: 3,
    title: "New Message",
    description: "Your package (PLM76TGF12) is arriving soon.",
    time: "3 hours ago",
    status: "Pending",
    statusColor: "#FBBF24",
  },
];

const NotificationPage: React.FC = () => {
  return (
    <div>
      <div className="w-2/4 bg-white p-6">
        <h2 className="font-bold text-xl mb-6">Notification</h2>

        {notifications.map((notification) => (
          <div key={notification.id} className="my-4">
            <div className="flex justify-between">
              <div className="flex gap-x-6">
                <div>
                  <DeliveryIcon />
                </div>

                <div>
                  <div className="font-bold">{notification.title}</div>

                  <div className="text-[#667085]">{notification.description}</div>

                  <div className="text-[#667085]">{notification.time}</div>
                </div>
              </div>

              <div className="text" style={{ color: notification.statusColor }}>
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
