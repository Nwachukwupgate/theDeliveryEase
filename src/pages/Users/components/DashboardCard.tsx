type Cards = {
    name: string;
    title: string;
    amount: string;
    color: string;  // Color is passed as a hex code string
  };
  
const DashboardCard: React.FC<Cards> = ({ name, title, amount, color }) => {
    return (
        <div className="flex flex-row w-full items-center lg:w-fit bg-white gap-x-4 p-4 rounded-lg shadow lg:flex-grow">
            <div
                className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold"
                style={{ backgroundColor: color }}
            >
                {name}
            </div>
            <div>
                <div>
                <p>{title}</p>
                </div>
                <div className="font-bold text-lg">
                <p>{amount}</p>
                </div>
            </div>
        </div>
    );
};
  

export default DashboardCard;
  