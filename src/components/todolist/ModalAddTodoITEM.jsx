import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'


function ModalAddTodoITEM({ setAddBTN, handleAddTodo }) {
    const { register, handleSubmit } = useForm()

    return (
        <div className="modal-overlay">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md"
            >
                <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
                <form onSubmit={handleSubmit(handleAddTodo)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="border p-2 rounded-md"
                        placeholder="Enter todo title"
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setAddBTN(false)}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:text-white hover:duration-500 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#FF6727] text-white rounded hover:bg-green-600 hover:duration-500 cursor-pointer"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default ModalAddTodoITEM