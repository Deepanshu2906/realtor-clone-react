import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

export default function Contact({ userRef, listing }) {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    }
    getLandlord();
  }, [userRef]);
  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {landlord !== null && (
        <div>
          <p>
            Contact {landlord.name} for the {listing.name}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300
              rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-300"
            ></textarea>
          </div>
          <a
            href={`mailto:${landlord.email}?subject=${listing.name}&body=${message}`}
            target="_blank"
          >
            <button
              className=" w-full px-7 py-3 bg-blue-600 text-white text-sm rounded uppercase shadow-md hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mb-3"
              type="button"
            >
              Send Messgae
            </button>
          </a>
        </div>
      )}
    </>
  );
}
