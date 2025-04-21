import React from "react";
import {  CircularProgress } from "@mui/material";
import { useRidersAcceptMutation, useRidersRejectMutation } from "@/api/apiSlice";
import { ApiError } from "@/types/types";
import { appToast } from "@/utilities/appToast";
import moment from 'moment';
import { DeliveryStatus } from "@/utilities/constants";
import { Link } from 'react-router-dom';



type DeliveryCardProps = {
  id: string;
  trackingId: string,
  delivery: string;
  address: string;
  status: string;
  date: string;
  selected: boolean;
  showAction: boolean;
  isAvailableDelivery?: boolean;
};

const DeliveringCard: React.FC<DeliveryCardProps> = ({
  id,
  trackingId,
  delivery,
  address,
  status,
  date,
  selected,
  showAction,
  isAvailableDelivery = false
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

  // Determine which buttons to show
  const showAcceptButton = isAvailableDelivery && showAction;
  const showRejectButton = !isAvailableDelivery && showAction && status === DeliveryStatus.DISPATCHED;

  return (
    <div className="border border-[#751F72] rounded-2xl p-2 mb-4 text-xs capitalize">
      <Link to={`/rider/${id}`}>
        <div className="flex justify-between items-center mb-4">
          <span className="">Tracking ID: <span className="font-semibold">{trackingId}</span></span>
          <span className="py-1 px-2 rounded-full  font-semibold bg-[#DDBCDC] text-[#330E32]">
            {delivery}
          </span>
        </div>

        <div
          className={`p-4 rounded-2xl  cursor-pointer ${selected ? "bg-[#330E32] text-white" : "bg-gray-100"}`}>

          {/* Progress and Address */}
          <div className="flex items-start">
            {/* Circular Progress Indicator */}
            <div className="relative flex flex-col items-center">
              {/* Progress circles */}
              <div className={`w-4 h-4 rounded-full ${selected ? "bg-white" : "bg-[#751F72]"} `}></div>
              <div className={`w-1 h-10 ${selected ? "bg-white" : "bg-[#751F72]"} `}></div> {/* Vertical line */}
              <div className={`w-4 h-4 rounded-full bg-inherit border ${selected ? "border-white" : "border-[#751F72]"} `}></div>
            </div>

            <div className="w-full">
              {/* Address and Date */}
              <div className="ml-4 flex">
                <p className="font-bold basis-9/12">{delivery}</p>
                <div className=" text-[10px]">
                  <p className="text-end">{moment(date).format("DD MMM YY")}</p>
                  <p className="text-end">{moment(date).format("h:mm A")}</p>
                </div>
              </div>

              <div className="ml-4 mt-2 flex">
                <p className="font-bold basis-9/12">{address}</p>
                <div className=" text-[10px]">
                  <p className="text-end">{moment(date).format("DD MMM YY")}</p>
                  <p className="text-end">{moment(date).format("h:mm A")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy Link */}
          <div className="mt-4 flex items-center justify-between">
            {/* <button className={`${selected ? "text-white" : "text-[#751F72]"}  text-sm flex items-center`}>
              Copy Link
              <svg className="ml-1 w-4 h-4"
                fill="none"
                stroke={selected ? "#fff" : "#751F72"}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="white" stroke-width="2" fill="transparent" />
                <rect x="3" y="3" width="13" height="13" rx="2" stroke="white" stroke-width="2" fill="transparent" />
              </svg>

            </button> */}

            <span
              className={`py-1 px-2 rounded-full text-sm font-semibold ${status === DeliveryStatus.DELIVERED
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
                }`}
            >
              {status}
            </span>
          </div>
        </div>
      </Link>

      {showAcceptButton && (
        <div className="flex justify-center gap-x-2 mt-4">
          <button
            onClick={submitAccept}
            disabled={acceptLoading}
            className=" bg-[#9DEA9B] rounded-2xl shadow-sm px-3 py-2 font-bold hover:bg-primaryColor100">
            {acceptLoading ? <CircularProgress size={24} /> : "Accept"}
          </button>
        </div>
      )}

      {showRejectButton && (
        <div className="flex justify-center gap-x-2 mt-4">
          <button
            onClick={submitReject}
            disabled={isLoading}
            className=" bg-[#F37F7F] rounded-2xl shadow-sm px-3 py-2 font-bold hover:bg-primaryColor100"
          >
            {isLoading ? <CircularProgress size={24} /> : "Reject"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveringCard;
