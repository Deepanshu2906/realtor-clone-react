import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px] ">
      <Link className="w-full" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-500 ease-in-out"
          loading="lazy"
          src={listing.imgUrls[0]}
          alt=""
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase font-semibold text-xs px-2 py-1 rounded-md shadow-lg"
          fromNow
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1 mb-[2px]">
            <MdLocationOn className="h-5 w-5 text-green-600" />
            <p className="font-semibold text-sm text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl ">{listing.name}</p>
          <p className="text-[#457b9d] font-semibold mt-2">
            &#8377;
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-sm">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-sm">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-8 h-4 cursor-pointer text-blue-700 hover:bg-gray-300 hover:rounded-full "
          onClick={() => onEdit(listing.id)}
        />
      )}
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500 "
          onClick={() => onDelete(listing.id)}
        />
      )}
    </li>
  );
}
