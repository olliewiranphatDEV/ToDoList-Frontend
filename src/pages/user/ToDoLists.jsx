import { useEffect, useState } from "react";
import useTodoStore from "../../store/useTodoStore";
import TodoHeader from "../../components/todolist/table/TodoHeader";
import useAuthStore from "../../store/useAuthStore";
import NoHaveTodoItems from "../../components/todolist/table/NoHaveTodoItems";
import TodoITEM from "../../components/todolist/table/TodoITEM";
import AlertDeleted from "../../components/todolist/table/AlertDeleted";
import { createTodo } from "../../api/user";
import ModalAddTodoITEM from "../../components/todolist/ModalAddTodoITEM";
import { AnimatePresence } from "framer-motion";
import SignOutBTN from "../../components/signup-signin-form/SignOutBTN";

const limit = 10;

const ToDoLists = () => {
    const { token } = useAuthStore();
    const { todoData, actionGetAllTodos } = useTodoStore();

    const [addBTN, setAddBTN] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    console.log('isDeleted >>>', isDeleted);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchUserTodos = async () => {
            if (!token) {
                window.location.href = "/";
                return;
            }
            try {
                await actionGetAllTodos(token, currentPage);
            } catch (error) {
                console.log("Fail to fetch user todos", error);
            }
        };
        fetchUserTodos();
    }, [currentPage]);

    const handleAddTodo = async (value) => {
        const response = await createTodo(token, value.title);
        await actionGetAllTodos(token, currentPage);
        setAddBTN(false);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < todoData.totalPages) setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gray-200 flex-col gap-5">
            <AlertDeleted isDeleted={isDeleted} />

            <div className="relative w-[60%] min-h-[400px] bg-white shadow-lg rounded-2xl flex flex-col">
                {/* ADD NEW TODO-ITEM */}
                <button
                    onClick={() => setAddBTN(true)}
                    className="cursor-pointer absolute z-50 top-[-10px] right-[-10px] bg-amber-400 text-[#FF6727] hover:bg-amber-500 hover:scale-125 hover:text-white hover:duration-500 font-bold text-3xl w-10 h-10 rounded-full flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-diamond-plus"><path d="M12 8v8" /><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" /><path d="M8 12h8" /></svg>
                </button>

                <TodoHeader />


                <div className="w-full flex flex-col gap-3 py-3 px-2 sm:px-4 min-h-[250px]">
                    {todoData.todoItems?.length === 0 ? (
                        <NoHaveTodoItems setAddBTN={setAddBTN} />
                    ) : (
                        <div className="w-full flex flex-col gap-3 py-3">
                            {todoData.todoItems.map((item, inx) => (
                                <TodoITEM
                                    key={item.todoID}
                                    item={item}
                                    inx={todoData.total - ((currentPage - 1) * limit + inx)}
                                    setIsDeleted={setIsDeleted}
                                />
                            ))}
                        </div>
                    )}

                    <AnimatePresence>
                        {addBTN && (
                            <ModalAddTodoITEM
                                setAddBTN={setAddBTN}
                                handleAddTodo={handleAddTodo}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* PAGINATION */}
                <div className="flex flex-col md:flex-row md:gap-40 justify-center items-center">
                    <div className="flex justify-center items-center gap-4 py-3">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded ${currentPage === 1
                                ? "bg-gray-300 text-white"
                                : "bg-[#FF6727] text-white hover:bg-orange-600 hover:duration-500 cursor-pointer"
                                }`}
                        >
                            Prev
                        </button>
                        <span>
                            Page {currentPage} of {todoData.totalPages || 1}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === todoData.totalPages}
                            className={`px-3 py-1 rounded ${currentPage === todoData.totalPages
                                ? "bg-gray-300 text-white"
                                : "bg-[#FF6727] text-white hover:bg-orange-600 hover:duration-500 cursor-pointer"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                    <SignOutBTN />
                </div>
            </div>


        </div>
    );
};

export default ToDoLists;
