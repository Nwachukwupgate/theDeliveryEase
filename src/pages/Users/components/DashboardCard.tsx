type DashboardCardProps = {
  name: string;
  title: string;
  amount: number | string;
  color: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  name,
  title,
  amount,
  color,
}) => {
  return (
    <div className="flex w-full max-w-[202px] flex-row items-center gap-x-4 rounded-lg bg-white p-4 shadow lg:w-fit lg:flex-grow">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
      <div>
        <p>{title}</p>
        <p className="text-lg font-bold">{amount ?? "-"}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
