import { useState } from 'react'
import SignInSubmit from '../../components/signup-signin-form/SignInSubmit';
import SignUpSubmit from '../../components/signup-signin-form/SignUpSubmit';
import LoadingSkeleton from '../../components/LoadingSkeleton';

function SignupSignin() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log('loading >>', loading);


    return (
        <div className="relative flex items-center justify-center gap-5 md:gap-8 min-h-screen bg-gray-200 px-4 py-10 md:px-0">

            <div className="relative max-w-[60%] shadow-2xl overflow-hidden rounded-xl">

                {/* Slide Panel */}
                <div className={`md:absolute top-0 left-0 w-full md:w-1/2 h-[250px] md:h-full bg-[#FF6727] text-white p-8 md:p-12 transition-all duration-700 z-20 flex flex-col items-center justify-center
                    ${isSignUp ? 'md:translate-x-full' : ''}`}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                        {isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}
                    </h2>
                    <p className="mb-4 text-center text-sm">
                        {isSignUp
                            ? 'To keep connected with us please login with your personal info'
                            : 'Enter your personal details and start journey with us'}
                    </p>
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="cursor-pointer border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-[#FF6727] hover:duration-500"
                    >
                        {isSignUp ? 'SIGN IN' : 'SIGN UP'}
                    </button>
                </div>

                {/* Forms Container */}
                <div className="flex flex-col md:flex-row w-full md:relative z-10">

                    {/* Sign In Form */}
                    <div className={`w-full md:w-1/2 p-8 md:p-12 transition-all duration-700
    ${isSignUp ? 'opacity-0 pointer-events-none -translate-y-full md:-translate-y-0 md:-translate-x-full md:opacity-0'
                            : 'opacity-100 md:translate-x-full md:opacity-100'}`}
                    >
                        {/* CONTENT */}
                        <SignInSubmit setLoading={setLoading} />
                    </div>

                    {/* Sign Up Form */}
                    <div className={`w-full md:w-1/2 p-8 md:p-12 bg-white transition-all duration-700 absolute top-0 left-0 md:static
    ${isSignUp ? 'opacity-100 pointer-events-auto translate-y-60 md:-translate-y-0 md:-translate-x-full md:opacity-100'
                            : 'opacity-0 pointer-events-none md:translate-x-0 md:opacity-0'}`}
                    >
                        {/* CONTENT */}
                        <SignUpSubmit setLoading={setLoading} />
                    </div>

                </div>
            </div>

            <div className='p-4 bg-white shadow-2xl rounded-2xl flex flex-col gap-4 items-center'>
                <strong>A Test Account</strong>
                <div className='flex flex-col gap-4'>
                    <span><strong>Email:</strong> test.todolist@mail.com</span>
                    <span><strong>Password:</strong> test1234</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-red-600 text-sm'>* Beware! make sure no have a space</span>
                    <span className='text-red-600 text-sm'>before the email or password that you coppied</span>
                </div>
            </div>

            {
                loading && (<LoadingSkeleton />)
            }
        </div>
    )
}

export default SignupSignin
