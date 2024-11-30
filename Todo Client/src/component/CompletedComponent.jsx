import React from 'react'
import axios from "axios";

function CompletedComponent(props) {
    const handleRemove = async () => {
      console.log(props.completedId," and ", props.todoId)
        try {
          const response = await axios.delete(`http://localhost:8081/todo/completed`, {
            data: { completedId: props.completedId, todoId : props.todoId },
            withCredentials: true,
          });
          
        } catch (error) {
        }
      };

  return (
    <>
        <div className="border-2 border-solid border-custom-darkBlue w-full h-32 my-3 flex flex-col p-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{props.name}</h3>
          </div>
          <p className="text-sm text-gray-700 mt-2">{props.content}</p>

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