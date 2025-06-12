import React from 'react'
import useAuthStore from '../../store/useAuthStore'
import { useNavigate } from 'react-router'

function SignOutBTN() {
    const { signout } = useAuthStore();
    const navigate = useNavigate();

    const handleSignout = () => {
        signout();
        navigate("/");
    }

    return (
        <button
            onClick={handleSignout}
            className="w-[90px] h-[34px] bg-gray-300 text-gray-500 font-semibold rounded-sm hover:bg-[#FF6727] hover:text-white hover:duration-500 hover:scale-110 cursor-pointer"
        >
            Signout
        </button>
    )
}

export default SignOutBTN