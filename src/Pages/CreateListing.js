import React, { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
  } = formData;

  function onChange() {}
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">
        Creating a Listing
      </h1>
      <form>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex gap-6">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
             transition duration-150 ease-in-out w-full ${
               type === "rent"
                 ? " bg-white text-black"
                 : "bg-slate-600 text-white"
             }`}
          >
            sell
          </button>
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
             transition duration-150 ease-in-out w-full ${
               type === "sale"
                 ? " bg-white text-black"
                 : "bg-slate-600 text-white"
             }`}
          >
            rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Property Name"
          maxLength="32"
          minLength={10}
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded
          transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white mb-6 focus:border-slate-600"
        />
        <div className="flex gap-6 mb-6">
          <div>
            <p className="text-xl font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="20"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div>
            <p className="text-xl font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="20"
              required
              className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold">Parking spot</p>
        <div className="flex gap-6">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
             transition duration-150 ease-in-out w-full ${
               !parking ? " bg-white text-black" : "bg-slate-600 text-white"
             }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
             transition duration-150 ease-in-out w-full ${
               parking ? " bg-white text-black" : "bg-slate-600 text-white"
             }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold"> Furnished </p>
        <div className="flex gap-6">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
             transition duration-150 ease-in-out w-full ${
               !furnished ? " bg-white text-black" : "bg-slate-600 text-white"
             }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
             transition duration-150 ease-in-out w-full ${
               furnished ? " bg-white text-black" : "bg-slate-600 text-white"
             }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="Address"
          maxLength="32"
          minLength={10}
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded
          transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white mb-6 focus:border-slate-600"
        />
        <p className="text-lg font-semibold">Description</p>
        <input
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          maxLength="150"
          minLength={20}
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded
          transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white mb-6 focus:border-slate-600"
        />
        <p className="text-lg font-semibold"> Offer </p>
        <div className="flex gap-6 mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
             transition duration-150 ease-in-out w-full ${
               !offer ? " bg-white text-black" : "bg-slate-600 text-white"
             }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg
             transition duration-150 ease-in-out w-full ${
               offer ? " bg-white text-black" : "bg-slate-600 text-white"
             }`}
          >
            No
          </button>
        </div>

        <div className="flex mb-6">
          <div>
            <p className="text-lg font-semibold">Regular Price</p>
            <div
              className="flex gap-6 justify-center items-center
            "
            >
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="10000"
                max="40000000"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus: bg-white focus:border-gray-600 text-center"
              />
              {type === "rent" && (
                <div>
                  <p className="ntext-md w-full whitespace-nowrap">
                    Rs / Month
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {offer && (
          <div className="flex mb-6">
            <div>
              <p className="text-lg font-semibold"> Discounted price</p>
              <div
                className="flex gap-6 justify-center items-center
            "
              >
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  min="10000"
                  max="40000000"
                  required={offer}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-gray-600 text-center"
                />
                {type === "rent" && (
                  <div>
                    <p className="ntext-md w-full whitespace-nowrap">Rs</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 tex-gray-700 bg-white border border-gray-300 rounded
            transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 mb-6 px-7 py-3 text-white font-medium rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
}
