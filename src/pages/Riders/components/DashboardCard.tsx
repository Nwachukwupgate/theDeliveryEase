type Cards = {
    name: string;
    title: string;
    amount: string;
    color: string;  // Color is passed as a hex code string
  };
  
const DashboardCard: React.FC<Cards> = ({ name, title, amount, color }) => {
    return (
        <div className="flex flex-row bg-white gap-x-2 p-2 items-center rounded-lg shadow lg:flex-grow">
            <div
                className="flex items-center justify-center h-8 w-8 rounded-full text-white font-bold"
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
  