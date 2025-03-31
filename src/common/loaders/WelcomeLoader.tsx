import loadingIcon from "../../assets/image/deliveryEaseLoading.gif";

const WelcomeLoader: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-purple-800">
      <div className="mb-4">
        <img src={loadingIcon} alt="Loading..." className="h-32 w-32" />
      </div>
      <p className="text-xl text-white">Ease In</p>
    </div>
  );
};

export default WelcomeLoader;
