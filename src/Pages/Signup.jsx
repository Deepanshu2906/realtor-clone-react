import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = formData;
    const navigate = useNavigate();

    function handleChange(e) {
        // console.log(e.target.value);
        setFormData((prev) => (
            {
                ...prev,
                [e.target.id]: e.target.value,
            }
        ))
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, {
                displayName: name
            });
            const user = userCredential.user;
            // deleting the password before storing inti db
            const formDataCopy = { ...formData };
            delete formDataCopy.password;
            // firebase has a method to insert time as 
            formDataCopy.timestamp = serverTimestamp();
            // firestore has a method setDoc ,doc return a promise  note : users is a collection
            await setDoc(doc(db, "users", user.uid), formDataCopy);
            // after sign in we want to redirect the user to home page

            navigate("/");
            // toast.success("Sign up was successful.")
        } catch (error) {
            // console.log(error);
            // to show up notification 
            toast.error("Something went wrong with registration!");

        }

    }
    return (
        <section>
            <h1 className='text-3xl text-center font-bold mt-6'>Sign Up</h1>

            <div className='flex justify-center flex-wrap items-center py-12 px-6 lg:max-w-6xl mx-auto'>
                <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6' >
                    <img className='w-full rounded-2xl' src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60" alt="key" />
                </div>
                <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-12'>
                    <form onSubmit={handleSubmit}>
                        <input className='w-full py-2 px-4 text-gray-700 bg-white text-xl rounded border-gray-300 transition ease-in-out mb-6' type='text' name="" id="name" placeholder='Full name' value={name} onChange={handleChange} />
                        <input className='w-full py-2 px-4 text-gray-700 bg-white text-xl rounded border-gray-300 transition ease-in-out mb-6' type='email' name="" id="email" placeholder='Email ' value={email} onChange={handleChange} />

                        <div className='relative mb-6'>
                            <input className='w-full py-2 px-4 text-gray-700 bg-white text-xl rounded border-gray-300 transition ease-in-out' type={showPassword ? "text" : "password"} name="" id="password" placeholder='Password' value={password} onChange={handleChange} />
                            {showPassword ? <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword(prev => (!prev))} /> : <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword(prev => (!prev))} />}
                        </div>
                        <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                            <p className='mb-6'>Have  a acoount ?
                                <Link to="/sign-in " className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'> Sign in</Link>
                            </p>
                            <p>
                                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot password</Link>
                            </p>
                        </div>

                        <button className='w-full bg-blue-600 text-white py-3 px-7 font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-800' type='submit'>Sign up</button>
                        <div className='flex items-center my-4
                    before:border-t before:flex-1 before:border-gray-300
                    after:border-t after:flex-1 after:border-gray-300'>
                            <p className='text-center font-semimold mx-4'>OR</p>
                        </div>
                        <OAuth />
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignUp;