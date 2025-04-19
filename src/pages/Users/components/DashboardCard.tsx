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
    <div className="flex gap-x-2 max-w-[161px] rounded-3xl bg-white p-2 shadow-sm">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-black text-sm  "
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
      <div>
        <p className=" text-[10px] font-medium">{title}</p>
        <p className="text-xl font-medium">{amount ?? "-"}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
