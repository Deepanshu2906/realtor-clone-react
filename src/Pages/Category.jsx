import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { TbDiscount2 } from "react-icons/tb";
import { useParams } from "react-router";

const Category = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [lastfetchedListing, setLastfetchedListing] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastfetchedListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
        console.log(listings);
      } catch (error) {
        toast.error("Could not fetch listing");
      }
    }
    fetchListings();
  }, [params.categoryName]);
  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastfetchedListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastfetchedListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
      console.log(listings);
    } catch (error) {
      toast.error("Could not fetch listing");
    }
  }
  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="flex justify-center items-center  gap-2 text-center text-blue-800 text-3xl mt-6 font-bold mb-6">
        {params.categoryName === "rent"
          ? "Places for rent"
          : "Places for sale !"}
      </h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastfetchedListing && (
            <div
              className="flex justify-center items-center
            "
            >
              <button
                className="bg-white px-3 py-2 rounded
               m-6 text-gray-700 border border-gray-300
               hover:border-slate-500 font-semibold transition duration-150 ease-in-out"
                onClick={onFetchMoreListings}
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <p>No current offers </p>
      )}
    </div>
  );
};

export { Category };
