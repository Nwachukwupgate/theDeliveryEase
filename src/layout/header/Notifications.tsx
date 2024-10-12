import BellFill from "@/common/icons/BellFill";

const Notifications: React.FC = () => {
  return (
    <div>
      <div className="hidden px-2 lg:block" role="button">
        <BellFill />
      </div>
    </div>
  );
};

export default Notifications;