import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { deleteTodo } from '../../api/user';
import useAuthStore from '../../store/useAuthStore';
import useTodoStore from '../../store/useTodoStore';

function ModalDeleteTodoITEM({ item, showDeleteModal, setShowDeleteModal, setIsDeleted }) {
    // console.log('ModalDeleteTodoITEM, todoID', item.todoID);

    const { token } = useAuthStore();
    const { actionGetAllTodos } = useTodoStore();

    const handleDeleteByID = async () => {
        try {
            console.log('todoID >>', item.todoID);
            const response = await deleteTodo(token, item.todoID)
            console.log('deleteTodo, response', response);

            await actionGetAllTodos(token)

            setIsDeleted(true)
            setShowDeleteModal(false)

            setTimeout(() => setIsDeleted(false), 1000)
        } catch (error) {
            console.error("Failed to delete todo", error)
        }
    }



    return (
        <AnimatePresence>
            {showDeleteModal && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-center"
                    >
                        <h2 className="text-lg font-bold mb-4">Delete this todo?</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete <strong>"{item.title}"</strong> item?</p>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:duration-500 cursor-pointer hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteByID}
                                className="px-4 py-2 bg-[#FF6727] text-white rounded hover:bg-orange-600 hover:duration-500 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ModalDeleteTodoITEM