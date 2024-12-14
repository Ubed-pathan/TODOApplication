    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import CompletedComponent from '../component/CompletedComponent';

    // export const getRefreshComplete = (setcompletedTodos, setToggle, toggle) => {
    //     axios.get('http://localhost:8081/todo/completed', {
    //         // headers: {
    //         //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    //         //   "Content-Type": 'application/json',
    //         // }
    //         withCredentials: true
    //       })
    //         .then(response => {
    //             setcompletedTodos(response.data);
    //             setToggle(!toggle);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching todos:', error);
    //         }
    //         )
    // }

    function Completed(props) {
        const [completedTodos, setcompletedTodos] = useState([]);
        const [toggle, setToggle] = useState(false);

        useEffect(() => {
            // getRefreshComplete(setcompletedTodos, setToggle, toggle);
            axios.get('http://localhost:8081/todo/completed', {
                // headers: {
                //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                //   "Content-Type": 'application/json',
                // }
                withCredentials: true
              })
                .then(response => {
                    setcompletedTodos(response.data);
                    // setToggle(!toggle);
                })
                .catch(error => {
                }
                )
        }, [toggle]);

        return (
            <>
                <div className="flex justify-center items-center mt-28 min-h-screen">
                    <div className="md:w-1/2 w-[90%] flex flex-col items-center bg-white p-5 rounded-lg shadow-md">
                        <div className="text-custom-red text-2xl font-medium mt-10 mb-4">
                            COMPLETED TODOS
                        </div>
                        <hr className="border-t-2 w-1/2 border-custom-red mb-6" />
        
                        {completedTodos.length === 0 ? (
                            <p className="text-gray-500 text-center">No completed todos yet!</p>
                        ) : (
                            completedTodos.map((completedTodo, index) => (
                                <CompletedComponent
                                    key={completedTodo.id}
                                    completedId={completedTodo.id}
                                    todoId={completedTodo.todoEntry.id}
                                    name={completedTodo.todoEntry.title}
                                    content={completedTodo.todoEntry.content}
                                    setcompletedTodos={setcompletedTodos}
                                    toggle={toggle}
                                    setToggle={setToggle}
                                />
                            ))
                        )}
                    </div>
                </div>
            </>
        );
        
    }

    export default Completed