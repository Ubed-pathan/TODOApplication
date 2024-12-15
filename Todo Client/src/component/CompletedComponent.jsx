import React from 'react'
import axios from "axios";
// import { getRefreshComplete } from '../routes/Completed';

function CompletedComponent(props) {
    const handleRemove = async () => {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_SERVER_API}/todo/completed`,{
            data: { completedId: props.completedId, todoId : props.todoId },
            // headers: {
            //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            //   "Content-Type": 'application/json',
            // }
            withCredentials: true
          });
           if(response.status == 200){
            // getRefreshComplete(props.setcompletedTodos, props.setToggle, toggle);
            props.setToggle(!props.toggle);
           }
          
        } catch (error) {
        }
      };

  return (
    <>
        <div className="border-2 border-solid border-custom-darkBlue w-full md:h-32 my-3 flex flex-col p-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold break-words overflow-hidden">{props.name}</h3>
          </div>
          <p className="text-sm text-gray-700 mt-2  break-words overflow-hidden">{props.content}</p>

          <div className="flex justify-end mt-auto">
            <button
              className="bg-red-700 p-1 text-white text-sm rounded-lg cursor-pointer"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
          </div>
        </>
      )}


export default CompletedComponent