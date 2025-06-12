import React from 'react'

function TodoHeader() {
    return (
        <div className="w-full h-[50px] bg-[#FF6727] flex text-center items-center px-6 font-semibold text-white text-xl rounded-t-2xl">
            <div className="w-[15%]">Check</div>
            <div className="flex-1">Todo Item</div>
            <div className="w-[25%]">Date</div>
        </div>
    )
}

export default TodoHeader