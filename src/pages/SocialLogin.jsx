import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { githubLogIn, googleLogIn } from '../components/feature/authSlice';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleGoogleLogin = () => {
        dispatch(googleLogIn());
    };

    const handleGithubLogin = () => {
        dispatch(githubLogIn());
    };
    useEffect(() => {
        if (user) {
            navigate("/"); // redirect automatically if user exists
        }
    }, [user, navigate]);
    return (
        <div className="mt-6 flex justify-center gap-4">
            <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 px-5 py-2 border rounded-lg hover:bg-gray-50 transition"
            >
                <FcGoogle size={22} /> <span>Google</span>
            </button>

            <button
                type="button"
                onClick={handleGithubLogin}
                className="flex items-center gap-2 px-5 py-2 border rounded-lg hover:bg-gray-50 transition"
            >
                <FaGithub size={22} /> <span>GitHub</span>
            </button>
        </div>
    );
};

export default SocialLogin;