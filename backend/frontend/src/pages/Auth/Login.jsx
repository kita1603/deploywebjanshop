import {useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import {toast} from "react-toastify";
import Loader from "../../components/Loader.jsx";

//sign in with google
import {GoogleAuthProvider, signInWithPopup, getAuth, signInWithRedirect, getRedirectResult} from "firebase/auth";
import app from "../../../firebaseConfig";
import "../../index.css";






const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    
    const {userInfo} = useSelector(state => state.auth);

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    const auth = getAuth(app);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await login({email, password}).unwrap();
            console.log(res);
            dispatch(setCredentials({...res}));
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    //google sign in
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            // const res = await signInWithPopup(auth, provider);
            const res = signInWithRedirect(auth, provider);

            console.log(res.user);
            const displayName = res.user;
            toast.success(`Logged in as ${displayName}`);
            dispatch(setCredentials({...res}));
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    return <div>
        <section className="pl-[10rem] flex flex wrap">
            <div className="mr-[4rem] mt-[5rem] rounded-lg p-8 shadow-md backdrop-filter backdrop-blur-lg ">
                <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium">Email Address</label>

                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 border rounded w-full"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>

                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 border rounded w-full"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        disabled={isLoading} 
                        type="submit" 
                        className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] neumorphism-black">{isLoading ? "Signing in..." : "Sign In"}
                    </button>

                    {isLoading && <Loader />}
                </form>

                <div className="mt-4">
                    <p className="text-black">
                        New Customer ? {" "}
                        <Link to={redirect ? '/register?redirect=' + redirect : '/register'} 
                        className="text-pink-500 hover:underline">Register</Link>
                    </p>
                </div>

                {/* google sign in */}
                <button 
                    onClick={signInWithGoogle} 
                    className="neumorphism-black mt-5 ">Sign In with Google</button>

            </div>
            <div className="absolute inset-0 z-[-1]">
                <img
                    src="https://blenderartists.org/uploads/default/original/4X/5/9/4/594a14fa84264d9163eb46b77bc5dbcf3e708b68.jpeg"
                    alt=""
                    className="h-[100%] w-[100%] object-cover"
                />
            </div>


        </section>
    </div>
};

export default Login;