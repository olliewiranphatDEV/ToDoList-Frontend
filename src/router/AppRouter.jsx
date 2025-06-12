import React from 'react'
import { Route, Routes } from 'react-router'
import NotFound from '../pages/public/NotFound'
import SignupSignin from '../pages/public/SignupSignin'
import ToDoLists from '../pages/user/ToDoLists'

function AppRouter() {
    return (
        <Routes>

            {/* PUBLIC-PAGE */}
            <Route path='/' element={<SignupSignin />} />

            {/* AFTER SIGNINED - USER PAGE */}
            <Route path='/user/todolists' element={<ToDoLists />} />

            {/* NOT FOUND PAGE*/}
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter