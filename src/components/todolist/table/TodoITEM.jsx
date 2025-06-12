import React, { useState } from 'react'
import { format } from 'date-fns'
import { updateTodo } from '../../../api/user'
import useAuthStore from '../../../store/useAuthStore'
import { useForm, Controller } from 'react-hook-form'
import useTodoStore from '../../../store/useTodoStore'
import AlertUpdated from './AlertUpdated'
import ModalDeleteTodoITEM from '../ModalDeleteTodoITEM'

function TodoITEM({ item, inx, setIsDeleted }) {
    const { token } = useAuthStore()
    const { actionGetAllTodos } = useTodoStore()

    const [editMode, setEditMode] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const { control, register, handleSubmit, watch } = useForm({
        defaultValues: {
            title: item.title,
            status: item.status === 'COMPLETED'
        }
    })

    const isCompleted = watch("status")

    const onSubmit = async (data) => {
        try {
            const payload = {
                title: data.title,
                status: data.status ? "COMPLETED" : "WORKING"
            }
            await updateTodo(token, item.todoID, payload)
            await actionGetAllTodos(token)
            setIsUpdated(true)
            setEditMode(false)
            setTimeout(() => setIsUpdated(false), 1000)
        } catch (err) {
            console.error("Failed to update todo", err)
        }
    }

    const onCheckboxChange = async (e, field) => {
        const newValue = e.target.checked
        field.onChange(newValue)

        const payload = {
            title: watch("title"),
            status: newValue ? "COMPLETED" : "WORKING"
        }

        try {
            await updateTodo(token, item.todoID, payload)
            await actionGetAllTodos(token)
            setIsUpdated(true)
            setTimeout(() => setIsUpdated(false), 1000)
        } catch (err) {
            console.error("Failed to update todo", err)
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full items-center flex-wrap md:flex-nowrap relative gap-2 px-2"
            >
                {/* Index + Checkbox */}
                <div className="w-[25%] md:w-[20%] min-w-[60px] flex items-center justify-center gap-2">
                    <span className="text-sm font-medium">{inx}.</span>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) => onCheckboxChange(e, field)}
                                className="w-4 h-4 cursor-pointer"
                            />
                        )}
                    />
                </div>

                {/* Title */}
                <div className={`flex-1 flex gap-2 break-words ${isCompleted ? "line-through text-gray-400" : ""}`}>
                    {editMode ? (
                        <div className="flex justify-between w-full gap-6">
                            <input
                                type="text"
                                {...register("title", { required: true })}
                                className="border px-2 py-1 rounded w-full"
                                autoFocus
                            />
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsUpdated(false)
                                        setEditMode(false)
                                    }}
                                    className="text-gray-600 underline text-sm cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>

                                </button>
                                <button type="submit" className="text-[#FF6727] underline text-sm cursor-pointer hover:scale-110 hover:duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 md:flex-row justify-between w-full items-center">
                            <span>{watch("title")}</span>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => setEditMode(true)}
                                    className="text-[#FF6727] cursor-pointer hover:scale-110 hover:duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(true)}
                                    className="text-[#FF6727] cursor-pointer hover:scale-110 hover:duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Date */}
                <div className={`w-[25%] text-sm text-right min-w-[120px] flex justify-center ${isCompleted ? "line-through text-gray-400" : ""}`}>
                    <span>{format(new Date(item.updatedAt || item.createdAt), "MMMM dd, yyyy")}</span>
                </div>

                <AlertUpdated isUpdated={isUpdated} />
            </form>

            {/* Delete Modal */}
            <ModalDeleteTodoITEM
                item={item}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                setIsDeleted={setIsDeleted}
            />
        </>
    )
}

export default TodoITEM
