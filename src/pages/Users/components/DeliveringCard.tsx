import React from "react";
import moment from 'moment';


type DeliveryCardProps = {
  id: number;
  delivery: string;
  address: string;
  status: string;
  date: string;
  onClick: () => void;
  selected: boolean;
};

const DeliveringCard: React.FC<DeliveryCardProps> = ({
    id,
    delivery,
    address,
    status,
    date,
    onClick,
    selected,
  }) => {
    return (
      <div className="border border-[#751F72] rounded-lg p-4 lg:p-8 mb-4">
        <div className="flex justify-between items-center mb-4">
            <span className="text-sm">Tracking ID: <span className="font-bold">{id}</span></span>
            <span className="py-1 px-3 rounded-full text-sm bg-[#DDBCDC] text-[#330E32]">
                {delivery}
            </span>
        </div>

        <div
            className={`p-4 rounded-lg border cursor-pointer ${
            selected ? "bg-[#330E32] text-white" : "bg-gray-100"
            }`}
            onClick={onClick}
        >

            {/* Progress and Address */}
            <div className="flex items-start">
                {/* Circular Progress Indicator */}
                <div className="relative flex flex-col items-center">
                    {/* Progress circles */}
                    <div className={`w-4 h-4 rounded-full ${selected ? "bg-white" : "bg-[#751F72]"} `}></div>
                    <div className={`w-1 h-14 ${selected ? "bg-white" : "bg-[#751F72]"} `}></div> {/* Vertical line */}
                    <div className={`w-4 h-4 rounded-full bg-inherit border ${selected ? "border-white" : "border-[#751F72]"} `}></div>
                </div>

                <div className="w-full">
                    {/* Address and Date */}
                    <div className="ml-4 text-sm flex">
                        <p className="font-bold basis-9/12">{delivery}</p>
                        <div>
                            <p className="text-end">{moment(date).format("DD MMM YYYY")}</p>
                            <p className="text-end">{moment(date).format("h:mm A")}</p>
                        </div>
                    </div>

                    <div className="ml-4 text-sm mt-2 flex">
                        <p className="font-bold basis-9/12">{address}</p>
                        <div>
                            <p className="text-end">{moment(date).format("DD MMM YYYY")}</p>
                            <p className="text-end">{moment(date).format("h:mm A")}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copy Link */}
            <div className="mt-4 flex items-center justify-between">
            <button className={`${selected ? "text-white" : "text-[#751F72]"}  text-sm flex items-center`}>
                <div className="mr-2">Copy Link</div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5675 8.01657L11.2268 7.368C12.5455 6.07086 12.5675 3.92711 11.2661 2.60403C9.96896 1.28531 7.82521 1.2633 6.50213 2.56473L5.84277 3.2133" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.22703 5.78608L2.57204 6.43035C1.24896 7.73179 1.23132 9.87125 2.53275 11.1943C3.82989 12.513 5.97364 12.5351 7.29672 11.2336L7.95171 10.5893" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.15283 8.61722L8.64612 5.18109" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>


            </button>

            <span
                className={`py-1 px-3 rounded-full text-sm ${
                status === "On the way"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
            >
                {status}
            </span>
            </div>
        </div>
      </div>
  );
};

export default DeliveringCard;
