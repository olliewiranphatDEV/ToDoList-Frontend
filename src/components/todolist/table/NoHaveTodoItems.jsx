import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion'
import ModalAddTodoITEM from '../ModalAddTodoITEM';


function NoHaveTodoItems({ setAddBTN }) {


    return (
        <div className="flex-1 min-h-[400px] flex flex-col justify-center items-center gap-3 text-gray-500">
            <span>No have any todo items,</span>
            <div className='flex items-center'>Click
                <button onClick={() => setAddBTN(true)} className='mx-3 cursor-pointer'><CirclePlus /></button>
                to create a new todo
            </div>
        </div>



    )
}

export default NoHaveTodoItems