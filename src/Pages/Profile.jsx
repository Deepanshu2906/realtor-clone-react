import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
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
  return (
    <>
      <section className="max-w-6xl mx-auto">
        <h1 className="text-3xl text-center font-bold mt-6">My Profile</h1>
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
    </>
  );
};

export default Profile;
