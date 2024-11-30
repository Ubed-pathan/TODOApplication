import React, { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import axios from "axios";

function TodoComponent(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: props.name,
    content: props.content,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset to original values if canceling edit
      setEditFormData({
        title: props.name,
        content: props.content,
      });
    }
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8081/todo/home`,
        { id: props.id, title: editFormData.title, content: editFormData.content },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Todo updated successfully");
        setIsEditing(false);
      }
      if(response.status >= 400){
        setEditFormData({
          title: props.name,
          content: props.content,
        });
        setEditFormData(false);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8081/todo/home`, {
        data: { id: props.id },
        withCredentials: true,
      });
      console.log("Todo deleted successfully", response.data);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8081/todo/completed/${props.id}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Todo marked as completed");
      }
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  return (
    <>
      {isEditing ? (
        <>
        <div className="border-2 border-solid border-custom-darkBlue w-full h-44 my-3 flex flex-col p-3">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="title"
            value={editFormData.title}
            onChange={handleChange}
            maxLength={50}
            className="p-1 border-2 border-gray-300 rounded-md"
          />
          <textarea
            name="content"
            value={editFormData.content}
            onChange={handleChange}
            maxLength={150}
            className="p-1 border-2 border-gray-300 rounded-md resize-none h-16"
          />
          <div className="flex justify-end space-x-2">
            <button
              className="bg-blue-600 p-1 text-white text-sm rounded-lg"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-400 p-1 text-white text-sm rounded-lg"
              onClick={handleEditToggle}
            >
              Cancel
            </button>
          </div>
        </div>
        </div>
        </>
      ) : (
        <>
        <div className="border-2 border-solid border-custom-darkBlue w-full h-32 my-3 flex flex-col p-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{props.name}</h3>
            <button className="cursor-pointer" onClick={handleEditToggle}>
              <BiSolidEdit size={18} className="text-green-600" />
            </button>
          </div>
          <p className="text-sm text-gray-700 mt-2">{props.content}</p>

          <div className="flex justify-end mt-auto">
            <button className="bg-green-600 p-1 text-white text-sm rounded-lg cursor-pointer mr-2"
            onClick={handleComplete}
            >
              Complete
            </button>
            <button
              className="bg-red-700 p-1 text-white text-sm rounded-lg cursor-pointer"
              onClick={handleDelete}
            >
              Remove
            </button>
          </div>
          </div>
        </>
      )}
    </>
  );
}

export default TodoComponent;
