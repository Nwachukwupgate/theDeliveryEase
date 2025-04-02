interface DashboardCardProps {
    name: string;
    title: string;
    amount: string;
    color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
    name,
    title,
    amount,
    color
}) => {
    return (
        <div className="flex flex-row items-center gap-x-2 rounded-lg bg-white p-4 shadow lg:flex-grow">
            <div
                className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white"
                style={{ backgroundColor: color }}
            >
                {name}
            </div>
            <div>
                <p className="text-sm text-gray-600">{title}</p>
                <p className="text-lg font-bold">{amount}</p>
            </div>
        </div>
    );
};

export default DashboardCard;