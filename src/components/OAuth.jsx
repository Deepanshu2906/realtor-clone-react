import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { useNavigate } from 'react-router';
const OAuth = () => {

    const naviagte = useNavigate();
    async function onGoogleClick() {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // console.log(user);
            // check for the user if exist
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                });
            }
            naviagte("/");

        } catch (error) {
            toast.error("Could not authorize with google")
        }

    }
    return (
        // changing  deafult behavior of button from submit to button
        <button type="button" onClick={onGoogleClick} className='flex  justify-center items-center w-full bg-red-600 text-white py-3 px-7 uppercase text-sm font-medium hover:bg-red-700 active:bg-red-800 shadow:md hover:shadow:xl tracking-widest rounded'>
            <FcGoogle className='text-2xl mr-2 bg-white rounded-full' />
            Continue with Google</button>
    )
}

export default OAuth