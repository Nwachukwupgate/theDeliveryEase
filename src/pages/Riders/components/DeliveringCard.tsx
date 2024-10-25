import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useRidersAcceptMutation, useRidersRejectMutation } from "@/api/apiSlice";
import { ApiError } from "@/types/types";
import { appToast } from "@/utilities/appToast";



type DeliveryCardProps = {
  id: string;
  delivery: string;
  address: string;
  status: string;
  date: string;
  selected: boolean;
  showAction: boolean;
};

const DeliveringCard: React.FC<DeliveryCardProps> = ({
    id,
    delivery,
    address,
    status,
    date,
    selected,
    showAction
  }) => {

  const [ridersReject, { isLoading }] = useRidersRejectMutation();
  const [ridersAccept, { isLoading: acceptLoading }] = useRidersAcceptMutation();

  const submitReject = async () => {
    try {
      const response = await ridersReject(id).unwrap();
      appToast.Success(response?.message);
    } catch (error) {
      const typedError = error as ApiError;
      const errorMessage = typedError?.data?.message || "Reject failed. Please try again.";
      appToast.Error(errorMessage);
    }
  };

  const submitAccept = async () => {
    try {
      const response = await ridersAccept(id).unwrap();
      appToast.Success(response?.message);
    } catch (error) {
      const typedError = error as ApiError;
      const errorMessage = typedError?.data?.message || "Accept failed. Please try again.";
      appToast.Error(errorMessage);
    }
  };

    return (
      <div className="border border-[#751F72] rounded-lg p-8 mb-4">
        <div className="flex justify-between items-center mb-4">
            <span className="text-sm">Tracking ID: <span className="font-bold">{id}</span></span>
            <span className="py-1 px-3 rounded-full text-sm bg-[#DDBCDC] text-[#330E32]">
                {delivery}
            </span>
        </div>

        <div
            className={`p-4 rounded-lg border cursor-pointer ${ selected ? "bg-[#330E32] text-white" : "bg-gray-100"}`}>
           
            {/* Progress and Address */}
            <div className="flex items-start">
                {/* Circular Progress Indicator */}
                <div className="relative flex flex-col items-center">
                    {/* Progress circles */}
                    <div className={`w-4 h-4 rounded-full ${selected ? "bg-white" : "bg-[#751F72]"} `}></div>
                    <div className={`w-1 h-10 ${selected ? "bg-white" : "bg-[#751F72]"} `}></div> {/* Vertical line */}
                    <div className={`w-4 h-4 rounded-full bg-inherit border ${selected ? "border-white" : "border-[#751F72]"} `}></div>
                </div>

                <div>
                    {/* Address and Date */}
                    <div className="ml-4 text-sm">
                        <p className="font-bold">2, {address}</p>
                        <p>{date}</p>
                    </div>

                    <div className="ml-4 text-sm mt-2">
                        <p className="font-bold">2, {address}</p>
                        <p>{date}</p>
                    </div>
                </div>
            </div>
    
            {/* Copy Link */}
            <div className="mt-4 flex items-center justify-between">
            <button className={`${selected ? "text-white" : "text-[#751F72]"}  text-sm flex items-center`}>
                Copy Link
                <svg className="ml-1 w-4 h-4"
                    fill="none"
                    stroke={selected ? "#fff" : "#751F72"}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="white" stroke-width="2" fill="transparent"/>
                    <rect x="3" y="3" width="13" height="13" rx="2" stroke="white" stroke-width="2" fill="transparent"/>
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

        {showAction && (
          <div className="flex justify-center gap-x-2 mt-4">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#9DEA9B", width: "120px", color: "black" }}
              onClick={submitAccept}
              disabled={acceptLoading}
            >
              {acceptLoading ? <CircularProgress size={24} /> : "Accept"}
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: "#F37F7F", width: "120px", color: "black" }}
              onClick={submitReject}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Reject"}
            </Button>
          </div>
        )}
      </div>
  );
};

export default DeliveringCard;
