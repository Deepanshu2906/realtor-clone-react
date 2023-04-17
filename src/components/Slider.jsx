import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";

export const Slider = function () {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use(Autoplay, Navigation, Pagination);
  const navigate = useNavigate();
  useEffect(() => {
    // fetch first five listing
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
      // console.log(listings);
    }

    fetchListings();
  }, []);
  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map((listing) => (
            <SwiperSlide
              key={listing.id}
              onClick={() =>
                navigate(`/category/${listing.data.type}/${listing.id}`)
              }
            >
              <div
                style={{
                  background: `url(${listing.data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className=" relative w-full h-[400px] overflow-hidden"
              ></div>
              <p
                className="absolute text-[#f1faee] left-1 top-3 font-medium
               max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl"
              >
                {listing.data.name}
              </p>
              <p
                className="absolute text-[#f1faee] left-1 bottom-1 font-semibold
               max-w-[90%] bg-[#e64946] shadow-lg opacity-90 p-2 rounded-tr-3xl"
              >
                &#8377;
                {listing.data.discountedPrice ?? listing.data.regularPrice}
                {listing.data.type === "rent" && "/ month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};
