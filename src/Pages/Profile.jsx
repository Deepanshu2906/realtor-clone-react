import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import ListingItem from "../components/ListingItem";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  // logging out and redirecting to home
  function onLogOut() {
    auth.signOut();
    navigate("/");
  }
  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        // update displayName in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in firestore

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name: name,
        });
        // showing msg
        toast.success("Profile details Updated");
      }
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }
  useEffect(() => {
    try {
      async function fetchUserListings() {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("userRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc")
        );
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
        // console.log("list content :", listings);
        // i am  consoling my listing to check
      }
      fetchUserListings();
    } catch (error) {
      console.log(error);
    }
  }, [auth.currentUser.uid]);
  // on Delete a listing item
  async function onDelete(listingID) {
    if (window.confirm("Are you sure want to delete ?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updateListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updateListings);
      toast.success("Successfully removed  the listing ");
    }
  }
  function onEdit(listingID) {
    navigate(`/edit-listing/${listingID}`);
  }
  return (
    <>
      <section className="max-w-6xl mx-auto">
        <h1 className="text-3xl text-center font-bold mt-6 text-blue-800">
          My Profile
        </h1>
        <div className="w-full md:w-[50%] mt-6 px-3 mx-auto">
          <form action="">
            {/*Name input */}
            <input
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-250"
              }`}
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={handleChange}
            />
            {/* email input */}
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
              type="email"
              id="eamil"
              value={email}
              disabled
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prev) => !prev);
                  }}
                  className="ml-1 text-red-600 hover:text-red-700 transition ease-ini-out duration-200 cursor-pointer"
                >
                  {changeDetail ? "Apply changes" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogOut}
                className="text-blue-600 hover:text-blue-700 transition ease-in-out cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800
            "
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center gap-2"
            >
              <FcHome className="text-3xl bg-red-200 rounded-full p-1 " />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
      {/* creting UI for listing */}

      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold"> My Listings</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
